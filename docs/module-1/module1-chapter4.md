---
sidebar_position: 4
---

# Chapter 4: Long-Running Tasks: Mastering ROS 2 Actions

## Overview: The Big Idea

We have explored topics for continuous data streams and services for quick request/response interactions. But what about tasks that take a long time to complete, like navigating to a specific location or executing a complex manipulation sequence? For these long-running tasks, ROS 2 provides a third communication pattern: actions. Actions are similar to services, but they provide feedback on the progress of the task and allow the task to be preempted or canceled.

## Key Concepts

*   **Action Server and Client**: Similar to services, actions have a server that provides the action and a client that uses it.
*   **Action Definition**: An action definition is a text file with a `.action` extension. It is divided into three parts, separated by `---`: the goal, the result, and the feedback.
    *   **Goal**: The request sent by the client to the server to start the action.
    *   **Result**: The final outcome of the action, sent by the server to the client upon completion.
    *   **Feedback**: Intermediate updates on the progress of the action, sent by the server to the client while the action is executing.
*   **Asynchronous Communication**: Actions are designed for asynchronous communication. The client sends a goal to the server and can then continue with other tasks. The client receives feedback and the final result via callbacks.

## Real-World Use Cases

Actions are essential for any task that takes a significant amount of time and for which you want to receive progress updates.

*   **Navigation**: A common use case for actions is robot navigation. A client can send a goal to a navigation action server with a target location, and the server will provide feedback on the robot's progress as it moves towards the goal.
*   **Robotic Arm Manipulation**: For a robotic arm, an action could be used to execute a complex pick-and-place task. The feedback could include the current position of the arm and the status of the gripper.
*   **3D Scanning**: An action could be used to perform a 3D scan of an environment. The feedback could be the percentage of the scan that is complete.

## Technical Explanations

### Creating a Custom Action

Creating a custom action is similar to creating custom messages and services. You create an `action` directory in your package and add a `.action` file for each of your actions.

For example, to create an action to compute the Fibonacci sequence, you could create a file named `Fibonacci.action` with the following content:

```
# Goal
int32 order
---
# Result
int32[] sequence
---
# Feedback
int32[] sequence
```

This defines an action where the goal is an integer `order`, the result is the final Fibonacci sequence, and the feedback is the sequence as it is being computed.

After defining your custom action, you need to update your `package.xml` and build files. Then, you can build your package with `colcon`, and your custom action will be available to use.

***Diagram Description***: *A diagram showing an action interaction. A "Client Node" sends a "Goal" to an "Action Server Node." The Action Server Node sends "Feedback" messages back to the Client Node while the action is executing. Once the action is complete, the Action Server Node sends a "Result" back to the Client Node.*

## Code Samples

Here is an example of an action server and client in Python using our `Fibonacci` action.

### Action Server

```python
import time
import rclpy
from rclpy.action import ActionServer
from rclpy.node import Node
from your_package_name.action import Fibonacci

class FibonacciActionServer(Node):

    def __init__(self):
        super().__init__('fibonacci_action_server')
        self._action_server = ActionServer(
            self,
            Fibonacci,
            'fibonacci',
            self.execute_callback)

    def execute_callback(self, goal_handle):
        self.get_logger().info('Executing goal...')
        feedback_msg = Fibonacci.Feedback()
        feedback_msg.sequence = [0, 1]
        for i in range(1, goal_handle.request.order):
            feedback_msg.sequence.append(feedback_msg.sequence[i] + feedback_msg.sequence[i-1])
            self.get_logger().info('Feedback: {0}'.format(feedback_msg.sequence))
            goal_handle.publish_feedback(feedback_msg)
            time.sleep(1)
        goal_handle.succeed()
        result = Fibonacci.Result()
        result.sequence = feedback_msg.sequence
        return result

def main(args=None):
    rclpy.init(args=args)
    fibonacci_action_server = FibonacciActionServer()
    rclpy.spin(fibonacci_action_server)
    rclpy.shutdown()

if __name__ == '__main__':
    main()
```

### Action Client

```python
import rclpy
from rclpy.action import ActionClient
from rclpy.node import Node
from your_package_name.action import Fibonacci

class FibonacciActionClient(Node):

    def __init__(self):
        super().__init__('fibonacci_action_client')
        self._action_client = ActionClient(self, Fibonacci, 'fibonacci')

    def send_goal(self, order):
        goal_msg = Fibonacci.Goal()
        goal_msg.order = order
        self._action_client.wait_for_server()
        self._send_goal_future = self._action_client.send_goal_async(goal_msg, feedback_callback=self.feedback_callback)
        self._send_goal_future.add_done_callback(self.goal_response_callback)

    def goal_response_callback(self, future):
        goal_handle = future.result()
        if not goal_handle.accepted:
            self.get_logger().info('Goal rejected :(')
            return
        self.get_logger().info('Goal accepted :)')
        self._get_result_future = goal_handle.get_result_async()
        self._get_result_future.add_done_callback(self.get_result_callback)

    def get_result_callback(self, future):
        result = future.result().result
        self.get_logger().info('Result: {0}'.format(result.sequence))
        rclpy.shutdown()

    def feedback_callback(self, feedback_msg):
        self.get_logger().info('Received feedback: {0}'.format(feedback_msg.feedback.sequence))

def main(args=None):
    rclpy.init(args=args)
    action_client = FibonacciActionClient()
    action_client.send_goal(10)
    rclpy.spin(action_client)

if __name__ == '__main__':
    main()
```

## Summary

In this chapter, we have completed our tour of the fundamental ROS 2 communication patterns by exploring actions. We have learned that actions are the ideal choice for long-running, feedback-producing tasks. With topics, services, and actions in your toolkit, you are now well-equipped to design and build the software architecture for a wide range of robotic systems.

In the next chapter, we will bring everything we have learned together and build a complete ROS 2 application from scratch.
