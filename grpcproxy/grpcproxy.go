package grpcproxy

import (
	"context"
	"fmt"
	"github.com/improbable-eng/grpc-web/go/grpcweb"
	"golang.org/x/net/http2"
	"golang.org/x/net/http2/h2c"
	"google.golang.org/grpc"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
	"net/http"
	"os"
)

type ProxyCallBack = func(ctx context.Context, method string, reqBody []byte) ([]byte, error)

func NewGRPCProxy(cb ProxyCallBack) (*grpc.Server, http.Server, error) {
	s := grpc.NewServer(grpc.UnknownServiceHandler(makeProxyFunc(cb)), grpc.ForceServerCodec(rawBytesCodec{}))
	wrappedServer := grpcweb.WrapServer(s)
	handler := func(resp http.ResponseWriter, req *http.Request) {
		// Set CORS headers
		resp.Header().Set("Access-Control-Allow-Origin", "*")
		resp.Header().Set("Access-Control-Allow-Headers", "Content-Type,x-grpc-web")

		wrappedServer.ServeHTTP(resp, req)
	}

	httpServer := http.Server{
		Handler: h2c.NewHandler(http.HandlerFunc(handler), &http2.Server{}),
	}
	return s, httpServer, nil
}

func makeProxyFunc(callBack ProxyCallBack) grpc.StreamHandler {
	return func(srv interface{}, stream grpc.ServerStream) error {
		// currently the callback function does not account for headers.
		methodName, ok := grpc.MethodFromServerStream(stream)
		if !ok {
			return status.Error(codes.Unavailable, "unable to get method name")
		}
		fmt.Fprintf(os.Stderr, "processing: %s", methodName)
		var reqBytes []byte
		err := stream.RecvMsg(&reqBytes)
		if err != nil {
			return err
		}

		respBytes, err := callBack(stream.Context(), methodName[1:], reqBytes) // strip first '/' of the method name
		if err != nil {
			return err
		}
		return stream.SendMsg(respBytes)
	}
}

type rawBytesCodec struct{}

func (rawBytesCodec) Marshal(v interface{}) ([]byte, error) {
	bytes, ok := v.([]byte)
	if !ok {
		return nil, fmt.Errorf("cannot encode type: %T", v)
	}
	return bytes, nil
}

func (rawBytesCodec) Unmarshal(data []byte, v interface{}) error {
	bufferPtr, ok := v.(*[]byte)
	if !ok {
		return fmt.Errorf("cannot decode into type: %T", v)
	}
	*bufferPtr = data
	return nil
}

func (rawBytesCodec) Name() string {
	return "lava/grpc-proxy-codec"
}
