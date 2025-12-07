---
sidebar_position: 3
---

# Chapter 3: Request and Response: Understanding ROS 2 Services

## Overview: The Big Idea

While topics are excellent for continuous data streams, there are many situations in robotics where a request/response interaction is more appropriate. For example, you might want to request a robot to perform a specific action and then receive a confirmation that the action was completed. This is where ROS 2 services come in. Services are a fundamental communication pattern in ROS 2 that allow one node to send a request to another node and receive a response.

## Key Concepts

*   **Service Server and Client**: A node that offers a service is called a service server. A node that uses a service is called a service client.
*   **Service Definition**: Like messages, services have a definition file that specifies the structure of the request and response. The service definition is divided into two parts, separated by `---`. The part above the separator is the request, and the part below is the response.
*   **Synchronous Communication**: By default, when a client calls a service, it blocks (waits) until it receives a response from the server. This is known as synchronous communication. ROS 2 also supports asynchronous service calls, where the client can continue with other tasks while waiting for the response.

## Real-World Use Cases

Services are used in a wide variety of robotics applications where a request/response interaction is needed.

*   **Triggering an Action**: A service can be used to trigger a specific action, such as telling a robotic arm to pick up an object.
*   **Querying for Data**: A service can be used to query a node for specific data, such as asking a localization node for the robot's current position.
*   **Configuration**: Services are often used to configure the parameters of a node at runtime.

## Technical Explanations

### Creating a Custom Service

Creating a custom service is very similar to creating a custom message. You create a `srv` directory in your package and add a `.srv` file for each of your services.

For example, to create a service that adds two integers, you could create a file named `AddTwoInts.srv` with the following content:

```
int64 a
int64 b
---
int64 sum
```

This defines a service where the request consists of two 64-bit integers, `a` and `b`, and the response is a single 64-bit integer, `sum`.

After defining your custom service, you need to update your `package.xml` and build files, just like with custom messages. Then, you can build your package with `colcon`, and your custom service will be available to use.

***Diagram Description***: *A diagram showing a service interaction. There is a "Client Node" and a "Server Node." The Client Node sends a "Request" to the Server Node. The Server Node processes the request and sends a "Response" back to the Client Node.*

## Code Samples

Here is an example of a service server and client in Python using our `AddTwoInts` service.

### Service Server

```python
from your_package_name.srv import AddTwoInts
import rclpy
from rclpy.node import Node

class AddTwoIntsServer(Node):

    def __init__(self):
        super().__init__('add_two_ints_server')
        self.srv = self.create_service(AddTwoInts, 'add_two_ints', self.add_two_ints_callback)

    def add_two_ints_callback(self, request, response):
        response.sum = request.a + request.b
        self.get_logger().info('Incoming request\na: %d b: %d' % (request.a, request.b))
        return response

def main(args=None):
    rclpy.init(args=args)
    add_two_ints_server = AddTwoIntsServer()
    rclpy.spin(add_two_ints_server)
    rclpy.shutdown()

if __name__ == '__main__':
    main()
```

### Service Client

```python
import sys
from your_package_name.srv import AddTwoInts
import rclpy
from rclpy.node import Node

class AddTwoIntsClient(Node):

    def __init__(self):
        super().__init__('add_two_ints_client')
        self.cli = self.create_client(AddTwoInts, 'add_two_ints')
        while not self.cli.wait_for_service(timeout_sec=1.0):
            self.get_logger().info('service not available, waiting again...')
        self.req = AddTwoInts.Request()

    def send_request(self):
        self.req.a = int(sys.argv[1])
        self.req.b = int(sys.argv[2])
        self.future = self.cli.call_async(self.req)

def main(args=None):
    rclpy.init(args=args)
    add_two_ints_client = AddTwoIntsClient()
    add_two_ints_client.send_request()

    while rclpy.ok():
        rclpy.spin_once(add_two_ints_client)
        if add_two_ints_client.future.done():
            try:
                response = add_two_ints_client.future.result()
            except Exception as e:
                add_two_ints_client.get_logger().info(
                    'Service call failed %r' % (e,))
            else:
                add_two_ints_client.get_logger().info(
                    'Result of add_two_ints: for %d + %d = %d' %
                    (add_two_ints_client.req.a, add_two_ints_client.req.b, response.sum))
            break

    add_two_ints_client.destroy_node()
    rclpy.shutdown()

if __name__ == '__main__':
    main()
```

## Summary

In this chapter, we have learned about ROS 2 services, a powerful communication pattern for request/response interactions. We have seen how to define our own custom services and how to implement service servers and clients in Python. With topics for continuous data streams and services for request/response, you now have a solid foundation for building a wide variety of robotic applications.

In the next chapter, we will explore ROS 2 actions, which are designed for long-running tasks.
