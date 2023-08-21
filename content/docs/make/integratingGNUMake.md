+++
title = "13 Integrating GNU `make`"
date = 2023-08-21T17:07:18+08:00
weight = 0
type = "docs"
description = ""
isCJKLanguage = true
draft = false

+++

# 13 Integrating GNU `make`

https://www.gnu.org/software/make/manual/make.html#Integrating-make



GNU `make` is often one component in a larger system of tools, including integrated development environments, compiler toolchains, and others. The role of `make` is to start commands and determine whether they succeeded or not: no special integration is needed to accomplish that. However, sometimes it is convenient to bind `make` more tightly with other parts of the system, both higher-level (tools that invoke `make`) and lower-level (tools that `make` invokes).







## 13.1 Sharing Job Slots with GNU `make`



GNU `make` has the ability to run multiple recipes in parallel (see [Parallel Execution](https://www.gnu.org/software/make/manual/make.html#Parallel)) and to cap the total number of parallel jobs even across recursive invocations of `make` (see [Communicating Options to a Sub-`make`](https://www.gnu.org/software/make/manual/make.html#Options_002fRecursion)). Tools that `make` invokes which are also able to run multiple operations in parallel, either using multiple threads or multiple processes, can be enhanced to participate in GNU `make`’s job management facility to ensure that the total number of active threads/processes running on the system does not exceed the maximum number of slots provided to GNU `make`.



GNU `make` uses a method called the “jobserver” to control the number of active jobs across recursive invocations. The actual implementation of the jobserver varies across different operating systems, but some fundamental aspects are always true.



First, `make` will provide information necessary for accessing the jobserver through the environment to its children, in the `MAKEFLAGS` environment variable. Tools which want to participate in the jobserver protocol will need to parse this environment variable and find the word starting with `--jobserver-auth=`. The value of this option will describe how to communicate with the jobserver. The interpretation of this value is described in the sections below.

Be aware that the `MAKEFLAGS` variable may contain multiple instances of the `--jobserver-auth=` option. Only the *last* instance is relevant.

Second, every command `make` starts has one implicit job slot reserved for it before it starts. Any tool which wants to participate in the jobserver protocol should assume it can always run one job without having to contact the jobserver at all.

Finally, it’s critical that tools that participate in the jobserver protocol return the exact number of slots they obtained from the jobserver back to the jobserver before they exit, even under error conditions. Remember that the implicit job slot should **not** be returned to the jobserver! Returning too few slots means that those slots will be lost for the rest of the build process; returning too many slots means that extra slots will be available. The top-level `make` command will print an error message at the end of the build if it detects an incorrect number of slots available in the jobserver.

As an example, suppose you are implementing a linker which provides for multithreaded operation. You would like to enhance the linker so that if it is invoked by GNU `make` it can participate in the jobserver protocol to control how many threads are used during link. First you will need to modify the linker to determine if the `MAKEFLAGS` environment variable is set. Next you will need to parse the value of that variable to determine if the jobserver is available, and how to access it. If it is available then you can access it to obtain job slots controlling how much parallelism your tool can use. Once done your tool must return those job slots back to the jobserver.

- [POSIX Jobserver Interaction](https://www.gnu.org/software/make/manual/make.html#POSIX-Jobserver)
- [Windows Jobserver Interaction](https://www.gnu.org/software/make/manual/make.html#Windows-Jobserver)





### 13.1.1 POSIX Jobserver Interaction



On POSIX systems the jobserver is implemented in one of two ways: on systems that support it, GNU `make` will create a named pipe and use that for the jobserver. In this case the auth option will have the form `--jobserver-auth=fifo:PATH` where ‘PATH’ is the pathname of the named pipe. To access the jobserver you should open the named pipe path and read/write to it as described below.



If the system doesn’t support named pipes, or if the user provided the `--jobserver-style` option and specified ‘pipe’, then the jobserver will be implemented as a simple UNIX pipe. In this case the auth option will have the form `--jobserver-auth=R,W` where ‘R’ and ‘W’ are non-negative integers representing file descriptors: ‘R’ is the read file descriptor and ‘W’ is the write file descriptor. If either or both of these file descriptors are negative, it means the jobserver is disabled for this process.

When using a simple pipe, only command lines that `make` understands to be recursive invocations of `make` (see [How the `MAKE` Variable Works](https://www.gnu.org/software/make/manual/make.html#MAKE-Variable)) will have access to the jobserver. When writing makefiles you must be sure to mark the command as recursive (most commonly by prefixing the command line with the `+` indicator (see [Recursive Use of `make`](https://www.gnu.org/software/make/manual/make.html#Recursion)). Note that the read side of the jobserver pipe is set to “blocking” mode. This should not be changed.

In both implementations of the jobserver, the pipe will be pre-loaded with one single-character token for each available job. To obtain an extra slot you must read a single character from the jobserver; to release a slot you must write a single character back into the jobserver.

It’s important that when you release the job slot, you write back the same character you read. Don’t assume that all tokens are the same character; different characters may have different meanings to GNU `make`. The order is not important, since `make` has no idea in what order jobs will complete anyway.

There are various error conditions you must consider to ensure your implementation is robust:

- If you have a command-line argument controlling the parallel operation of your tool, consider whether your tool should detect situations where both the jobserver and the command-line argument are specified, and how it should react.
- If your tool does not recognize the format of the `--jobserver-auth` string, it should assume the jobserver is using a different style and it cannot connect.
- If your tool determines that the `--jobserver-auth` option references a simple pipe but that the file descriptors specified are closed, this means that the calling `make` process did not think that your tool was a recursive `make` invocation (e.g., the command line was not prefixed with a `+` character). You should notify your users of this situation.
- Your tool should be sure to write back the tokens it read, even under error conditions. This includes not only errors in your tool but also outside influences such as interrupts (`SIGINT`), etc. You may want to install signal handlers to manage this write-back.
- Your tool may also examine the first word of the `MAKEFLAGS` variable and look for the character `n`. If this character is present then `make` was invoked with the ‘-n’ option and your tool may want to stop without performing any operations.





### 13.1.2 Windows Jobserver Interaction



On Windows systems the jobserver is implemented as a named semaphore. The semaphore will be set with an initial count equal to the number of available slots; to obtain a slot you must wait on the semaphore (with or without a timeout). To release a slot, release the semaphore.

To access the semaphore you must parse the `MAKEFLAGS` variable and look for the argument string `--jobserver-auth=NAME` where ‘NAME’ is the name of the named semaphore. Use this name with `OpenSemaphore` to create a handle to the semaphore.



The only valid style for `--jobserver-style` is ‘sem’.

There are various error conditions you must consider to ensure your implementation is robust:

- Usually you will have a command-line argument controlling the parallel operation of your tool. Consider whether your tool should detect situations where both the jobserver and the command-line argument are specified, and how it should react.
- Your tool should be sure to release the semaphore for the tokens it read, even under error conditions. This includes not only errors in your tool but also outside influences such as interrupts (`SIGINT`), etc. You may want to install signal handlers to manage this write-back.





## 13.2 Synchronized Terminal Output



Normally GNU `make` will invoke all commands with access to the same standard and error outputs that `make` itself was started with. A number of tools will detect whether the output is a terminal or not-a-terminal, and use this information to change the output style. For example if the output goes to a terminal the tool may add control characters that set color, or even change the location of the cursor. If the output is not going to a terminal then these special control characters are not emitted so that they don’t corrupt log files, etc.

The `--output-sync` (see [Output During Parallel Execution](https://www.gnu.org/software/make/manual/make.html#Parallel-Output)) option will defeat the terminal detection. When output synchronization is enabled GNU `make` arranges for all command output to be written to a file, so that its output can be written as a block without interference from other commands. This means that all tools invoked by `make` will believe that their output is not going to be displayed on a terminal, even when it will be (because `make` will display it there after the command is completed).

In order to facilitate tools which would like to determine whether or not their output will be displayed on a terminal, GNU `make` will set the `MAKE_TERMOUT` and `MAKE_TERMERR` environment variables before invoking any commands. Tools which would like to determine whether standard or error output (respectively) will be displayed on a terminal can check these environment variables to determine if they exist and contain a non-empty value. If so the tool can assume that the output will (eventually) be displayed on a terminal. If the variables are not set or have an empty value, then the tool should fall back to its normal methods of detecting whether output is going to a terminal or not.

The content of the variables can be parsed to determine the type of terminal which will be used to display the output.

Similarly, environments which invoke `make` and would like to capture the output and eventually display it on a terminal (or some display which can interpret terminal control characters) can set these variables before invoking `make`. GNU `make` will not modify these environment variables if they already exist when it starts.