+++
title = "wrk"
date = 2024-10-11T19:42:21+08:00
weight = 0
type = "docs"
description = ""
isCJKLanguage = true
draft = false
+++

https://manpages.ubuntu.com/manpages/noble/en/man1/wrk.1.html

#### **NAME**

```
       wrk - a modern HTTP benchmarking tool
```

#### **SYNOPSIS**

```
       wrk <options> <url>
```

#### **DESCRIPTION**

```
              Options:

       -c, --connections <N>
              Connections to keep open

       -d, --duration
              <T>  Duration of test

       -t, --threads
              <N>  Number of threads to use

       -s, --script
              <S>  Load Lua script file

       -H, --header
              <H>  Add header to request

       --latency
              Print latency statistics

       --timeout
              <T>  Socket/request timeout

       -v, --version
              Print version details

              Numeric  arguments  may include a SI unit (1k, 1M, 1G) Time arguments may include a
              time unit (2s, 2m, 2h)
```