---
layout: post
title:  "Loop Unrolling 和 Duff's Device"
categories: coding
---

在读 CSAPP (Computer Systems) 第五章时，了解到 Loop Unrolling 这个概念。今天在 Learn C
the Hard Way 的一个练习时，看到 Duff's Device，一种非常有趣的 Loop Unrolling
写法，下面来看一下。

CSAPP 第五章是 <Optimizing Program Performance>，主要内容是讲怎样根据 CPU
知识和编译器特性，优化程序的效率。其中 Loop Unrolling
就是优化程序效率的一种方法。书中是这样定义 Loop Unrolling 的:

> Loop Unrolling is a program transformation that reduces the number of iterations for a loop by increasing the number of elements computed on each iteration.

就是说，增加每次循环里面遍历元素的数量。那么增加遍历元素的数量，又是怎样让程序变快的呢？基本原理就是，加减法运算是非常快的(只需要1
CPU clock cycle 来执行)，所以循环执行的代价(Loop overhead)，就变成制约 CPU 运行的瓶颈。而 Loop Unrolling 通过增加循环里面遍历的元素，减少了循环次数，从而使程序变快。

需要注意的是，如果循环里面乘法和除法等更复杂的指令时，循环执行的代价并不是程序效率的瓶颈，所以 Loop Unrolling 是无效的。

在 CSAPP 中，Loop Unrolling 的代码是这样写的：

  /* Unroll loop by 2*/
  void combine5(
