---
layout: post
title:  "快速对版本数据进行排序"
date:   2016-09-07
categories: chinese
---

工作中，经常会需要对版本数据进行排序，譬如下面这种 iOS 系统相关的数据：

![](/images/blog/sort-1.png)

如果直接使用 Excel 将第一列转换为文本进行排序，会乱掉，证明 Excel 的字串排序方法跟我们想的不一样。

Google 一下，发现遇到这个问题的人不少，解决方法也不少。

问题是，我们怎样利用现成的工具，快速解决这个问题呢？

下面介绍三种方法，可以快速对 nnn.nnn.nnn.nnn 这种类型数据进行排序（如版本信息，ip 地址等）。

Excel 分列排序
=========

既然 Excel 直接排序不行，那我们就先将第一列分隔为三列，然后按照优先级排序。
我用的是wps，用 Excel 操作是一样的。

使用分列功能将系统版本按照 `.` 号分成三列

![](/images/blog/sort-wps-1.png)

使用自定义排序根据多列排序

![](/images/blog/sort-wps-2.png)

Duang，排好了
![](/images/blog/sort-wps-3.png)

Google Sheet 字符排序
=========

Google Sheet 的字符排序方法比 Excel 更符合我们的预期。
但仍然有缺陷，如下图将第一列按照text格式排序后，`10` 的位置是不对的。
如果不需要考虑两位数的情况，可以使用 Google Sheet 进行快速排序。

![](/images/blog/sort-google.png)

sort 命令排序
=========

如果你使用linux系统，可以使用 `sort -n` 命令来排序：

```
sort -n demo.txt
```

![](/images/blog/sort-n.png)
