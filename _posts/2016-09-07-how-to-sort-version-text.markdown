---
layout: post
title:  "快速对版本数据进行排序"
date:   2016-09-07
categories: chinese
---

工作中，经常会需要对版本数据进行排序，譬如下面这种 iOS 系统相关的数据：

![](/images/blog/sort-1.png)

所以希望能找到一个快捷的办法来进行排序。

使用 Excel 将第一列转换为文本进行排序，会乱掉，证明 Excel
的字串排序方法跟我们想的不一样。

经过一段时间 google 后，介绍下面三种办法，来排序这种类型的数据，下面介绍的方法，不仅仅适用于版本号，还适用于 ip 地址排序等情况。

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
