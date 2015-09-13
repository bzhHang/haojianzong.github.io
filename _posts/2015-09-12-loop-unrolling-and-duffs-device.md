---
layout: post
title:  "Loop Unrolling 和 Duff's Device"
categories: coding
---

在读 CSAPP (Computer Systems) 第五章时，了解到 Loop Unrolling
这个概念。今天在学习 Learn C the Hard Way 的一个练习时，看到 Duff's Device，发现这种非常有趣的写法，可以考验一下我们对C语言的理解。

下面先来了解一下什么是 Loop Unrolling。

CSAPP 第五章是 \<Optimizing Program Performance\>，主要内容是讲怎样根据 CPU 原理和编译器特性，优化程序的效率。其中 Loop Unrolling 就是优化程序效率的一种方法。书中是这样定义 Loop Unrolling 的:

> Loop Unrolling is a program transformation that reduces the number of iterations for a loop by increasing the number of elements computed on each iteration.

就是说，增加每次循环里面遍历元素的数量。那么增加遍历元素的数量，又是怎样让程序变快的呢？

基本原理就是，CPU的加减法运算指令是非常快的(只需要1 CPU clock cycle 来执行)，所以此时循环执行的代价(Loop overhead)，就是制约 CPU 运行的瓶颈。而 Loop Unrolling 通过增加循环里面遍历的元素，减少了循环次数，从而使程序变快。

需要注意的是，如果循环里面使用了乘法和除法等更复杂的指令时，循环执行的代价就不是程序效率的瓶颈，所以 Loop Unrolling 是无效的。

在 CSAPP 中，Loop Unrolling 的代码是这样写的：

    /* Unroll loop by 2*/
    void combine5(long int *data, long int *dest, int length)
    {
      long int i;
      long int limit = length - 1;
      long int acc = 0;

      /* Combine 2 elements at a time */
      for (i = 0; i < limit; i+=2) {
        acc = (acc + data[i]) + data[i+1];
      }

      /* Finish any remaining elements */
      for (; i< length; i++) {
        acc = acc + data[i];
      }

      *dest = acc;
    }

可以看到，为了实现 Loop Unrolling，这段代码使用了两个循环体。第二个循环体是为了处理当循环元素数量不是 2 的倍数的情况。

而 Duff's Device，则利用了 C 语言的语言特性，使用了下面这样一种极难理解的写法来实现 Loop Unrolling：

    int duffs_device(char *from, char *to, int count)
    {
        /* Unroll loop by 8 */
        {
            int n = (count + 7) / 8;

            switch(count % 8) {
                case 0: do { *to++ = *from++;
                            case 7: *to++ = *from++;
                            case 6: *to++ = *from++;
                            case 5: *to++ = *from++;
                            case 4: *to++ = *from++;
                            case 3: *to++ = *from++;
                            case 2: *to++ = *from++;
                            case 1: *to++ = *from++;
                        } while(--n > 0);
            }
        }

        return count;
    }

这段代码将一组数据从一个内存地址copy到另一个内存地址，大家可以尝试理解下这段代码是如何实现 Loop Unrolling 的。

巧妙的是，比起 CSAPP 上面那段代码，这里的写法只用了一个 do-while loop，并不需要另外写一个循环来遍历剩余的元素。如果感兴趣，可以看 LearnCtheHardWay [这篇练习](http://c.learncodethehardway.org/book/ex23.html)来理解这段代码。

然而我上面介绍的两种 Loop Unrolling 写法，对你的代码优化都是没什么用的。一般来说 Compiler 已经为你优化好代码了，除非你有充分证据(Profiling)证明需要、并且可以提高程序性能，否则千万不要写上面这种难以阅读的代码。
