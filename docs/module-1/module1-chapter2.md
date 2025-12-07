---
sidebar_position: 2
---

# Chapter 2: The Flow of Information: A Deep Dive into ROS 2 Topics and Custom Messages

## Overview: The Big Idea

In the previous chapter, we introduced the concept of ROS 2 topics as named buses for exchanging messages between nodes. Topics are the lifeblood of a ROS 2 system, carrying the streams of data that allow a robot to perceive and react to its environment. In this chapter, we will take a deeper dive into topics, exploring their properties and learning how to create our own custom message types to tailor the flow of information to our specific needs.

## Key Concepts

*   **Publishers and Subscribers**: Nodes use publishers to send messages to a topic and subscribers to receive messages from a topic. A topic can have multiple publishers and multiple subscribers.
*   **Quality of Service (QoS)**: QoS settings in ROS 2 provide a powerful way to control the reliability and behavior of communication between nodes. You can configure settings like reliability (best-effort or reliable), durability (how many messages are saved for late-joining subscribers), and history depth.
*   **Message Definitions**: A message definition is a simple text file that defines the data structure of a message. It specifies the type and name of each field in the message.
*   **IDL (Interface Definition Language)**: ROS 2 uses the Interface Definition Language (IDL) to describe the interfaces between nodes. Message definitions are a part of this.

## Real-World Use Cases

The ability to create custom messages is essential for building real-world robotic systems.

*   **Custom Sensor Data**: If you have a unique sensor that produces data not covered by the standard ROS 2 message types, you can create a custom message to represent that data.
*   **Complex Robot State**: You might create a custom message to represent the complete state of your robot, including things like joint positions, battery level, and current task.
*   **Application-Specific Data**: For a specific application, like a robot designed for agriculture, you might create custom messages to represent things like soil moisture or plant health.

## Technical Explanations

### Creating a Custom Message

To create a custom message, you first need to create a new package. Inside this package, you will create a `msg` directory. Inside the `msg` directory, you will create a `.msg` file for each of your custom messages.

For example, to create a custom message to represent a 3D vector, you could create a file named `Vector3.msg` with the following content:

```
# A 3D vector
float64 x
float64 y
float64 z
```

After defining your custom message, you need to add the necessary dependencies and build directives to your `package.xml` and `CMakeLists.txt` or `setup.py` files. Then, you can build your package with `colcon`, and your custom message will be available to use in your ROS 2 nodes.

***Diagram Description***: *A diagram illustrating the process of creating a custom message. It starts with a box labeled "Create a package." An arrow points to a box labeled "Create a 'msg' directory." An arrow points to a box labeled "Create a '.msg' file." An arrow points to a box labeled "Edit package.xml and build files." An arrow points to a box labeled "Build with colcon." Finally, an arrow points to a box labeled "Use the custom message in your nodes."*

## Code Samples

Here is an example of how to use our custom `Vector3` message in a Python node.

```python
# First, make sure you have built your package with the custom message
# and sourced the setup file.

# Then, in your Python node:
from your_package_name.msg import Vector3  # Import your custom message
import rclpy
from rclpy.node import Node

class VectorPublisher(Node):

    def __init__(self):
        super().__init__('vector_publisher')
        self.publisher_ = self.create_publisher(Vector3, 'my_vector', 10)
        timer_period = 0.5  # seconds
        self.timer = self.create_timer(timer_period, self.timer_callback)
        self.i = 0

    def timer_callback(self):
        msg = Vector3()
        msg.x = float(self.i)
        msg.y = float(self.i * 2)
        msg.z = float(self.i * 3)
        self.publisher_.publish(msg)
        self.get_logger().info('Publishing: x=%f, y=%f, z=%f' % (msg.x, msg.y, msg.z))
        self.i += 1

def main(args=None):
    rclpy.init(args=args)
    vector_publisher = VectorPublisher()
    rclpy.spin(vector_publisher)
    vector_publisher.destroy_node()
    rclpy.shutdown()

if __name__ == '__main__':
    main()
```

## Summary

In this chapter, we have explored ROS 2 topics in greater detail. We have learned about the publisher/subscriber model, Quality of Service settings, and, most importantly, how to create our own custom messages. The ability to define custom data structures is a fundamental skill in ROS 2 development, allowing you to build complex and specialized robotic systems.

In the next chapter, we will look at another essential communication pattern in ROS 2: services.
