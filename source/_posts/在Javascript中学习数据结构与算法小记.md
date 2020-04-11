---
title: 在Javascript中学习数据结构与算法小记
date: 2017-11-03 22:05:47
tags:
  - JavaScript
  - 算法
  - 数据结构
category: 
  - frontend
  - 编程练习
---
本文是以数据结构和普遍算法在js中的体现，以此来学习js，首先会体现或者实现的数据结构和算法如下：
<!--more-->

## 数据结构

1. 栈：一种遵从先进后出 (LIFO) 原则的有序集合；新添加的或待删除的元素都保存在栈的末尾，称作栈顶，另一端为栈底。在栈里，新元素都靠近栈顶，旧元素都接近栈底。
2. 队列：与上相反，一种遵循先进先出 (FIFO / First In First Out) 原则的一组有序的项；队列在尾部添加新元素，并从头部移除元素。最新添加的元素必须排在队列的末尾。
3. 链表：存储有序的元素集合，但不同于数组，链表中的元素在内存中并不是连续放置的；每个元素由一个存储元素本身的节点和一个指向下一个元素的引用（指针/链接）组成。
4. 集合：由一组无序且唯一（即不能重复）的项组成；这个数据结构使用了与有限集合相同的数学概念，但应用在计算机科学的数据结构中。
5. 字典：以 [键，值] 对为数据形态的数据结构，其中键名用来查询特定元素，类似于 Javascript 中的Object。
6. 散列：根据关键码值（Key value）直接进行访问的数据结构；它通过把关键码值映射到表中一个位置来访问记录，以加快查找的速度；这个映射函数叫做散列函数，存放记录的数组叫做散列表。
7. 树：由 n（n>=1）个有限节点组成一个具有层次关系的集合；把它叫做“树”是因为它看起来像一棵倒挂的树，也就是说它是根朝上，而叶朝下的，基本呈一对多关系，树也可以看做是图的特殊形式。
图：图是网络结构的抽象模型；图是一组由边连接的节点（顶点）；任何二元关系都可以用图来表示，常见的比如：道路图、关系图，呈多对多关系。

## 算法
1.排序算法
 a. 冒泡排序：比较任何两个相邻的项，如果第一个比第二个大，则交换它们；元素项向上移动至正确的顺序，好似气泡上升至表面一般，因此得名。
 b. 选择排序：每一次从待排序的数据元素中选出最小（或最大）的一个元素，存放在序列的起始位置，以此循环，直至排序完毕。
 c. 插入排序：将一个数据插入到已经排好序的有序数据中，从而得到一个新的、个数加一的有序数据，此算法适用于少量数据的排序，时间复杂度为 O(n^2)。
 d. 归并排序：将原始序列切分成较小的序列，只到每个小序列无法再切分，然后执行合并，即将小序列归并成大的序列，合并过程进行比较排序，只到最后只有一个排序完毕的大序列，时间复杂度为 O(n log n)。
 e. 快速排序：通过一趟排序将要排序的数据分割成独立的两部分，其中一部分的所有数据都比另外一部分的所有数据都要小，然后再按此方法对这两部分数据分别进行上述递归排序，以此达到整个数据变成有序序列，时间复杂度为 O(n log n)。

2.搜索算法
 a. 顺序搜索：让目标元素与列表中的每一个元素逐个比较，直到找出与给定元素相同的元素为止，缺点是效率低下。
 b. 二分搜索：在一个有序列表，以中间值为基准拆分为两个子列表，拿目标元素与中间值作比较从而再在目标的子列表中递归此方法，直至找到目标元素。

3.其他
 a. 贪心算法：在对问题求解时，不考虑全局，总是做出局部最优解的方法。
 b. 动态规划：在对问题求解时，由以求出的局部最优解来推导全局最优解。

>复杂度概念：一个方法在执行的整个生命周期，所需要占用的资源，主要包括：时间资源、空间资源。

---
## 栈：ADT
![Alt text](/assets/blogImg/zhan_adt.jpg)

栈是一种遵从先进后出 (LIFO) 原则的有序集合；新添加的或待删除的元素都保存在栈的末尾，称作栈顶，另一端为栈底。在栈里，新元素都靠近栈顶，旧元素都接近栈底。

通俗来讲，一摞叠起来的书或盘子都可以看做一个栈，我们想要拿出最底下的书或盘子，一定要现将上面的移走才可以。

栈也被用在编程语言的编译器和内存中保存变变量、方法调用。

在 Javascript 中我们可以使用数组的原生方法实现一个栈/队列的功能，鉴于学习目的，我们使用类来实现一个栈。
```javascript
class Stack {

    constructor() {
        this.items = []
    }

    InitStack (items = []) {
      this.items = items
    }


    // 入栈
    Push(element) {
         this.items.push(element)
    }

    // 出栈
    Pop() {
        return this.items.pop()
    }

    // 获取栈顶
    get GetTop() {
        return this.items[this.items.length - 1]
    }

    // 是否为空栈
    get isEmpty() {
        return !this.items.length
    }

    // 尺寸
    get StackLength() {
        return this.items.length
    }

    // 销毁
    destroyStack() {
        this.items = null
    }

    // 清空栈
    clearStack(){
      this.items = []
    }

    // 打印栈数据
    print() {
        console.log(this.items.toString())
    }
}
```

使用这个栈

```javascript
// 实例化一个栈
const stack = new Stack()
console.log(stack.isEmpty) // true

// 添加元素
stack.Push(5)
stack.Push(8)

// 读取属性再添加
console.log(stack.GetTop) // 8
stack.Push(11)
console.log(stack.StackLength) // 3
console.log(stack.isEmpty) // false
```
## 队列
队列： 只允许在一端进行插入操作、而在另一端进行删除操作的线性表。

* 先进先出(FIFO)
* 在队尾进行插入，从队头进行删除
![Alt text](/assets/blogImg/queue_adt.jpg)
在计算机科学中，一个常见的例子就是打印队列。比如说我们需要打印五份文档。我们会打开每个文档，然后点击打印按钮。每个文档都会被发送至打印队列。第一个发送到打印队列的文档会首先被打印，以此类推，直到打印完所有文档。

同样的我们用JavaScript来实现一个队列类
```javascript
class Queue {

    constructor(items) {
        this.items = items || []
    }

    // 入列
    enqueue(element){
        this.items.push(element)
    }
    // 出列
    dequeue(){
        return this.items.shift()
    }

    // 第一个元素
    front(){
        return this.items[0]
    }

    // 清楚
    clear(){
        this.items = []
    }

    // 获取长度
    get size(){
        return this.items.length
    }

    // 是否空
    get isEmpty(){
        return !this.items.length
    }

    print() {
        console.log(this.items.toString())
    }
}
```
使用可以如下
```javascript
const queue = new Queue()
console.log(queue.isEmpty) // true

queue.enqueue('John')
queue.enqueue('Jack')
queue.enqueue('Camila')
console.log(queue.size) // 3
console.log(queue.isEmpty) // false
queue.dequeue()
queue.dequeue()
queue.print() // 'Camila'
```
优先队列

队列大量应用在计算机科学以及我们的生活中，我们在之前话题中实现的默认队列也有一些修改版本。

其中一个修改版就是优先队列。元素的添加和移除是基于优先级的。一个现实的例子就是机场登机的顺序。头等舱和商务舱乘客的优先级要高于经济舱乘客。在有些国家，老年人和孕妇(或 带小孩的妇女)登机时也享有高于其他乘客的优先级。

另一个现实中的例子是医院的(急诊科)候诊室。医生会优先处理病情比较严重的患者。通常，护士会鉴别分类，根据患者病情的严重程度放号。

实现一个优先队列，有两种选项：设置优先级，然后在正确的位置添加元素；或者用入列操作添加元素，然后按照优先级移除它们。在下面示例中，我们将会在正确的位置添加元素，因此可以对它们使用默认的出列操作：
```javascript
class PriorityQueue {

    constructor() {
        this.items = []
    }

    enqueue(element, priority){
        const queueElement = { element, priority }
        if (this.isEmpty) {
            this.items.push(queueElement)
        } else {
            const preIndex = this.items.findIndex((item) => queueElement.priority < item.priority)
            if (preIndex > -1) {
                this.items.splice(preIndex, 0, queueElement)
            } else {
                this.items.push(queueElement)
            }
        }
    }

    dequeue(){
        return this.items.shift()
    }

    front(){
        return this.items[0]
    }

    clear(){
        this.items = []
    }

    get size(){
        return this.items.length
    }

    get isEmpty(){
        return !this.items.length
    }

    print() {
        console.log(this.items)
    }
}

```
优先队列的使用
```javascript
const priorityQueue = new PriorityQueue()
priorityQueue.enqueue('John', 2)
priorityQueue.enqueue('Jack', 1)
priorityQueue.enqueue('Camila', 1)
priorityQueue.enqueue('Surmon', 3)
priorityQueue.enqueue('skyRover', 2)
priorityQueue.enqueue('司马萌', 1)
priorityQueue.print()

console.log(priorityQueue.isEmpty, priorityQueue.size) // false 6

```

循环队列

为充分利用向量空间，克服"假溢出"现象的方法是：将向量空间想象为一个首尾相接的圆环，并称这种向量为循环向量。存储在其中的队列称为循环队列（Circular Queue）。这种循环队列可以以单链表、队列的方式来在实际编程应用中来实现。

下面我们基于首次实现的队列类，简单实现一个循环引用的示例：
```javascript
class LoopQueue extends Queue {

    constructor(items) {
        super(items)
    }

    getIndex(index) {
        const length = this.items.length
        return index > length ? (index % length) : index
    }

    find(index) {
        return !this.isEmpty ? this.items[this.getIndex(index)] : null
    }
}
```
访问一个循环队列：
```javascript
const loopQueue = new LoopQueue(['Surmon'])
loopQueue.enqueue('SkyRover')
loopQueue.enqueue('Even')
loopQueue.enqueue('Alice')
console.log(loopQueue.size, loopQueue.isEmpty) // 4 false

console.log(loopQueue.find(26)) // 'Evan'
console.log(loopQueue.find(87651)) // 'Alice
```
链表

要存储多个元素，数组（或列表）可能是最常用的数据结构。 每种语言都实现了数组。这种数据结构非常方便，提供了一个便利的[]语法来访问它的元素。 然而，这种数据结构有一个缺点：在大多数语言中，数组的大小是固定的，从数组的起点或中间插入或移除项的成本很高，因为需要移动元素； 尽管 JavaScript 中的Array类方法可以帮我们做这些事，但背后的处理机制同样如此。

链表存储有序的元素集合，但不同于数组，链表中的元素在内存中并不是连续放置的。每个 元素由一个存储元素本身的节点和一个指向下一个元素的引用(也称指针或链接)组成。下图展示了链表的结构:
![Alt text](/assets/blogImg/lianbiao.jpg)
相对于传统的数组，链表的一个好处在于，添加或移除元素的时候不需要移动其他元素。然而，链表需要使用指针，因此实现链表时需要额外注意。

数组的另一个细节是可以直接访问任何位置的任何元素，而要想访问链表中间的一个元素，需要从起点(表头)开始迭代列表直到找到所需的元素。

现实中有许多链表的例子：一列火车是由一系列车厢/车皮组成的，每节车厢/车皮都相互连接，你很容易分离一节车皮，改变它的位置，添加或移除它。下图演示了一列火车，每节车皮都是列表的元素，车皮间的连接就是指针

用JavaScript实现一个链表类
```javascript
// 链表节点
class Node {
    constructor(element) {
        this.element = element
        this.next = null
    }
}

// 链表
class LinkedList {

    constructor() {
        this.head = null
        this.length = 0
    }

    // 追加元素
    append(element) {
        const node = new Node(element)
        let current = null
        if (this.head === null) {
            this.head = node
        } else {
            current = this.head
            while(current.next) {
                current = current.next
            }
            current.next = node
        }
        this.length++
    }

    // 任意位置插入元素
    insert(position, element) {
        if (position >= 0 && position <= this.length) {
            const node = new Node(element)
            let current = this.head
            let previous = null
            let index = 0
            if (position === 0) {
                this.head = node
            } else {
                while (index++ < position) {
                    previous = current
                    current = current.next
                }
                node.next = current
                previous.next = node
            }
            this.length++
            return true
        }
        return false
    }

    // 移除指定位置元素
    removeAt(position) {

        // 检查越界值
        if (position > -1 && position < length) {
            let current = this.head
            let previous = null
            let index = 0
            if (position === 0) {
                this.head = current.next
            } else {
                while (index++ < position) {
                    previous = current
                    current = current.next
                }
                previous.next = current.next
            }
            this.length--
            return current.element
        }
        return null
    }

    // 寻找元素下标
    findIndex(element) {
        let current = this.head
        let index = -1
        while (current) {
            if (element === current.element) {
                return index + 1
            }
            index++
            current = current.next
        }
        return -1
    }

    // 删除指定文档
    remove(element) {
        const index = this.indexOf(element)
        return this.removeAt(index)
    }

    isEmpty() {
        return !this.length
    }

    size() {
        return this.length
    }

    // 转为字符串
    toString() {
        let current = this.head
        let string = ''
        while (current) {
            string += ` ${current.element}`
            current = current.next
        }
        return string
    }
}
```
使用
```javascript
const linkedList = new LinkedList()

console.log(linkedList)
linkedList.append(2)
linkedList.append(6)
linkedList.append(24)
linkedList.append(152)

linkedList.insert(3, 18)
console.log(linkedList)
console.log(linkedList.findIndex(24))
```
双向链表

链表有多种不同的类型，这一节介绍双向链表。双向链表和普通链表的区别在于，在链表中， 一个节点只有链向下一个节点的链接，而在双向链表中，链接是双向的:一个链向下一个元素， 另一个链向前一个元素，如下图所示:

双向链表提供了两种迭代列表的方法:从头到尾，或者反过来。我们也可以访问一个特定节 点的下一个或前一个元素。在单向链表中，如果迭代列表时错过了要找的元素，就需要回到列表 起点，重新开始迭代。这是双向链表的一个优点。

```javascript
// 链表节点
class Node {
    constructor(element) {
        this.element = element
        this.prev = null
        this.next = null
    }
}

// 双向链表
class DoublyLinkedList {

    constructor() {
        this.head = null
        this.tail = null
        this.length = 0
    }

    // 任意位置插入元素
    insert(position, element) {
        if (position >= 0 && position <= this.length){
            const node = new Node(element)
            let current = this.head
            let previous = null
            let index = 0
            // 首位
            if (position === 0) {
                if (!head){
                    this.head = node
                    this.tail = node
                } else {
                    node.next = current
                    this.head = node
                    current.prev = node
                }
            // 末位
            } else if (position === this.length) {
                current = this.tail
                current.next = node
                node.prev = current
                this.tail = node
            // 中位
            } else {
                while (index++ < position) {
                    previous = current
                    current = current.next
                }
                node.next = current
                previous.next = node
                current.prev = node
                node.prev = previous
            }
            this.length++
            return true
        }
        return false
    }

    // 移除指定位置元素
    removeAt(position) {
        if (position > -1 && position < this.length) {
            let current = this.head
            let previous = null
            let index = 0

            // 首位
            if (position === 0) {
                this.head = this.head.next
                this.head.prev = null
                if (this.length === 1) {
                    this.tail = null
                }

            // 末位
            } else if (position === this.length - 1) {
                this.tail = this.tail.prev
                this.tail.next = null

            // 中位
            } else {
                while (index++ < position) {
                     previous = current
                     current = current.next
                }
                previous.next = current.next
                current.next.prev = previous
         }
         this.length--
         return current.element
        } else {
            return null
        }
    }

    // 其他方法...
}
```
集合

集合是由一组无序且唯一（不能重复）的项组成的。这个数据结构使用了与有限集合相同的数学概念，但应用在计算机科学的数据结构中。

在数学中，集合是一组不同的对象（的集）。

比如说：一个由大于或等于0的证书组成的自然数集合：N = { 0, 1, 2, 3, 4, 5, 6, ... }，集合中的对象列表用{}包围。

集合是由一组一（即不能重的项组成的。这个数据结构使用了与有..合相同的数学..，但应用在.算..学的数据结构中。

目前 ES6 中已内置了 Set 类型的实现，出于学习目的，下面我们依旧使用Javascript创建一个集合类：
```javascript
class Set {

    constructor() {
        this.items = {}
    }

    has(value) {
        return this.items.hasOwnProperty(value)
    }

    add(value) {
        if (!this.has(value)) {
            this.items[value] = value
            return true
        }
        return false
    }

    remove(value) {
        if (this.has(value)) {
            delete this.items[value]
            return true
        }
        return false
    }

    get size() {
        return Object.keys(this.items).length
    }

    get values() {
        return Object.keys(this.items)
    }
}
```
使用集合类：
```javascript
const set = new Set()
set.add(1)
console.log(set.values)  // ["1"]
console.log(set.has(1))  // true
console.log(set.size) // 1
set.add(2)
console.log(set.values)  // ["1", "2"]
console.log(set.has(2))  // true
console.log(set.size) // 2
set.remove(1)
console.log(set.values) // ["2"]
set.remove(2)
console.log(set.values) // []
```
对集合可以进行如下操作：

并集：对于给定的两个集合，返回一个包含两个集合中所有元素的新集合。
交集：对于给定的两个集合，返回一个包含两个集合中Р有元素的新集合。
差集：对于给定的两个集合，返回一个包含所有存在于第一个集合且不存在于第二个集合的元素的新集合。
子集：求证一个给定集合是否是另一集合的子集。
并集

并集的数学概念：集合A和B的并集，表示为A∪B，定义如下：A∪B = { x | x∈A ∨ x∈B }，意思是x（元素）存在于A中，或x存在于B中。

我们基于刚才的 Set 类实现一个并集方法：

```javascript
union(otherSet) {
    const unionSet = new Set()
    this.values.forEach((v, i) => unionSet.add(this.values[i]))
    otherSet.values.forEach((v, i) => unionSet.add(otherSet.values[i]))
    return unionSet
}
```
交集

并集的数学概念：集合A和B的交集，表示为A∩B，定义如下：A∩B = { x | x∈A ∧ x∈B }，意思是x（元素）存在于A中，且x存在于B中。

```javascript
intersection(otherSet) {
    const intersectionSet = new Set()
    this.values.forEach((v, i) => {
        if (otherSet.has(v)) {
            intersectionSet.add(v)
        }
    })
    return intersectionSet
}
```
差集

差集的数学概念：集合A和B的差集，表示为A-B，定义如下：A-B = { x | x∈A ∧ x∉B }，意思是x（元素）存在于A中，且不x存在于B中。
```javascript
difference(otherSet) {
    const differenceSet = new Set()
    this.values.forEach((v, i) => {
        if (!otherSet.has(v)) {
            differenceSet.add(v)
        }
    })
    return differenceSet
}
```
子集

子集的数学概念：集合A是B的子集，或者说集合B包含了集合A
```javascript
subset(otherSet) {
    if (this.size > otherSet.size) {
        return false
    } else {
        return !this.values.some(v => !otherSet.has(v))
    }
}
```
字典

集合、字典、散列表都可以存储不重复的数据。字典和我们上面实现的集合很像，上面的集合中我们以{ value: value }的形式存储数据，而字典是以{ key: value }的形式存储数据，字典也称作映射。

简单说：Object 对象便是字典在 Javascript 中的实现。

还是简单实现一个字典类：
```
class Dictionary {

    constructor() {
        this.items = {}
    }

    set(key, value) {
        this.items[key] = value
    }

    get(key) {
        return this.items[key]
    }

    remove(key) {
        delete this.items[key]
    }

    get keys() {
        return Object.keys(this.items)
    }

    get values() {

        /*
        也可以使用ES7中的values方法
        return Object.values(this.items)
        */

        // 在这里我们通过循环生成一个数组并输出
        return Object.keys(this.items).reduce((r, c, i) => {
            r.push(this.items[c])
            return r
        }, [])
    }
}
```
使用字典类：
```javascript
const dictionary = new Dictionary()
dictionary.set('Gandalf', 'gandalf@email.com')
dictionary.set('John', 'johnsnow@email.com')
dictionary.set('Tyrion', 'tyrion@email.com')

console.log(dictionary)
console.log(dictionary.keys)
console.log(dictionary.values)
console.log(dictionary.items)
```
散列

HashTable 类，也叫 HashMap 类，是 Dictionary 类的一种散列表实现方式。

散列算法的作用是尽可能快地在数据结构中找到一个值。在上面的例子中，如果要在数据结构中获得一个值（使用get方法），需要遍历整个数据结构来得到它。如果使用散列函数，就知道值的具体位置，因此能够快速检索到该值，散列函数的作用是给定一个键值，然后返回值在表中的地址。

举个例子，我们继续使用上面字典中的代码示例。我们将要使用最常见的散列函数 - 'lose lose'散列函数，方法是简单地将每个键值中的每个字母的ASCII值相加。
![散列](/assets/blogImg/sanlie.jpg)
老规矩，直接上正餐
```javascript
class HashTable {

    constructor() {
        this.table = []
    }

    // 散列函数
    static loseloseHashCode(key) {
        let hash = 0
        for (let codePoint of key) {
            hash += codePoint.charCodeAt()
        }
        return hash % 37
    }

    // 修改和增加元素
    put(key, value) {
        const position = HashTable.loseloseHashCode(key)
        console.log(`${position} - ${key}`)
        this.table[position] = value
    }

    get(key) {
        return this.table[HashTable.loseloseHashCode(key)]
    }

    remove(key) {
        this.table[HashTable.loseloseHashCode(key)] = undefined
    }
}
```

对于 HashTable 类来说，我们不需要像 ArrayList 类一样从 table 数组中将位置也移除。由 于元素分布于整个数组范围内，一些位置会没有任何元素占据，并默认为undefined值。我们也 不能将位置本身从数组中移除（这会改变其他元素的位置），否则，当下次需要获得或移除一个 元素的时候，这个元素会不在我们用散列函数求出的位置上。

使用 HashTable 类
```javascript
const hash = new HashTable()
hash.put('Surmon', 'surmon.me@email.com') // 19 - Surmon
hash.put('John', 'johnsnow@email.com') // 29 - John
hash.put('Tyrion', 'tyrion@email.com') // 16 - Tyrion

// 测试get方法
console.log(hash.get('Surmon')) // surmon.me@email.com
console.log(hash.get('Loiane')) // undefined
console.log(hash)
```
下面的图表展现了包含这三个元素的 HashTable 数据结构:
![散列表](/assets/blogImg/sanliebiao.jpg)
散列表和散列集合

散列表和散列映射是一样的，上面已经介绍了这种数据结构。

在一些编程语言中，还有一种叫作散列集合的实现。散列集合由一个集合构成，但是插人、 移除或获取元素时，使用的是散列函数。我们可以重用上面实现的所有代码来实现散列集合， 不同之处在于，不再添加键值对，而是只插入值而没有键。例如，可以使用散列集合来存储所有 的英语单词（不包括它们的定义)。和集合相似，散列集合只存储唯一的不重复的值。

处理散列表中的冲突

有时候，一些键会有相同的散列值。不同的值在散列表中对应相同位置的时候，我们称其为冲突。如下代码：
```javascript
const hash = new HashTable()
hash.put('Gandalf',    'gandalf@email.com')
hash.put('John', 'johnsnow®email.com')
hash.put('Tyrion', 'tyrion@email.com')
hash.put('Aaron',    'aaronOemail.com')
hash.put('Donnie', 'donnie@email.com')
hash.put('Ana', 'ana©email.com')
hash.put('Jonathan', 'jonathan@email.com')
hash.put('Jamie', 'jamie@email.com')
hash.put('Sue',    'sueOemail.com')
hash.put('Mindy', 'mindy@email.com')
hash.put('Paul', 'paul©email.com')
hash.put('Nathan', 'nathan@email.com')
```
在上面代码中，Tyrion 和 Aaron 有相同的散列值（16)，Donnie 和 Ana 有相同的散列值（13)，Jonathan、Jamie 和 Sue 有相同的散列值（5), Mindy 和 Paul 也有相同的散列值（32)，导致最终的数据对象中，只有最后一次被添加/修改的数据会覆盖原本数据，进而生效。

使用一个数据结构来保存数据的目的显然不是去丢失这些数据，而是通过某种方法将它们全部保存起来；因此，当这种情况发生的时候就要去解决它。

处理冲突有几种方法：分离链接、线性探查和双散列法。下面介绍前两种方法。

分离链接

分离链接法包括为散列表的每一个位置创建一个链表并将元素存储在里面。它是解决冲突的 最简单的方法，但是它在 HashTable 实例之外还需要额外的存储空间。

例如，我们在之前的测试代码中使用分离链接的话，输出结果将会是这样：
![散列demo](/assets/blogImg/sanlie-demo.jpg)
在位置5上，将会有包含三个元素的LinkedList实例
在位置13、16和32上，将会有包含两个元素的LinkedList实例
在位置10、19和29上，将会有包含单个元素的LinkedList实例
对于分离链接和线性探查来说，只需要重写三个方法：put、get 和 remove 这三个方法，在 每种技术实现中都是不同的。

为了实现一个使用了分离链接的 HashTable 实例，我们需要一个新的辅助类来表示将要加人 LinkedList 实例的元素，在这里我们可以直接使用链表类。

下面我们加入链表类重写三个方法：
```javascript
put(key, value) {
    const position = HashTable.loseloseHashCode(key)
    if (this.table[position] === undefined) {
        this.table[position] = new LinkedList()
    }
    this.table[position].append({ key, value })
}

get(key) {
    const position = HashTable.loseloseHashCode(key)
    if (this.table[position] === undefined) return undefined
    const getElementValue = node => {
        if (!node && !node.element) return undefined
        if (Object.is(node.element.key, key)) {
            return node.element.value
        } else {
            return getElementValue(node.next)
        }
    }
    return getElementValue(this.table[position].head)
}

remove(key) {
    const position = HashTable.loseloseHashCode(key)
    if (this.table[position] === undefined) return undefined
    const getElementValue = node => {
        if (!node && !node.element) return false
        if (Object.is(node.element.key, key)) {
            this.table[position].remove(node.element)
            if (this.table[position].isEmpty) {
                this.table[position] = undefined
            }
            return true
        } else {
            return getElementValue(node.next)
        }
    }
    return getElementValue(this.table[position].head)
}
```
树

树是一种非顺序数据结构，一种分层数据的抽象模型，它对于存储需要快速查找的数据非常有用。

现实生活中最常见的树的例子是家谱，或是公司的组织架构图.
同样的，我们使用 Javascript 实现一个 BinarySearchTree 类。
```javascript
class Node {
    constructor(key) {
        this.key = key
        this.left = null
        this.right = null
    }
}

class BinarySearchTree {

    constructor() {
        this.root = null
    }

    insert(key) {
        const newNode = new Node(key)
        const insertNode = (node, newNode) => {
            if (newNode.key < node.key) {
                if (node.left === null) {
                    node.left = newNode
                } else {
                    insertNode(node.left, newNode)
                }
            } else {
                if (node.right === null) {
                    node.right = newNode
                } else {
                    insertNode(node.right, newNode)
                }
            }
        }
        if (!this.root) {
            this.root = newNode
        } else {
            insertNode(this.root, newNode)
        }
    }
}
```
二叉搜索树类的使用：
```javascript
const tree = new BinarySearchTree()
tree.insert(11)
tree.insert(7)
tree.insert(5)
tree.insert(3)
tree.insert(9)
tree.insert(8)
tree.insert(10)
tree.insert(13)
tree.insert(12)
tree.insert(14)
tree.insert(20)
tree.insert(18)
tree.insert(25)
```
![二叉树](/assets/blogImg/erchashu.png)
树的遍历

遍历一棵树是指访问树的每个节点并对它们进行某种操作的过程。但是我们应该怎么去做呢？应该从树的顶端还是底端开始呢？从左开始还是从右开始呢？

访问树的所有节点有三种方式：中序、先序、后序。

中序遍历

中序遍历是一种以上行顺序访问 BST 所有节点的遍历方式，也就是以从最小到最大的顺序访 问所有节点。中序遍历的一种应用就是对树进行排序操作。我们来看它的实现：
```javascript
inOrderTraverse(callback) {
    const inOrderTraverseNode = (node, callback) => {
        if (node !== null) {
            inOrderTraverseNode(node.left, callback)
            callback(node.key)
            inOrderTraverseNode(node.right, callback)
        }
    }
    inOrderTraverseNode(this.root, callback)
}
```
inOrderTraverse方法接收一个回调函数作为参数，回调函数用来定义我们对遍历到的每个节点进行的操作，这也叫作访问者模式。

在之前展示的树上执行下面的方法：
```javascript
tree.inOrderTraverse(value => { console.log(value) })
```
下面的结果将会在控制台上输出（每个数字将会输出在不同的行）:

3 5 6 7 8 9 10 11 12 13 14 15 18 20 25

下面的图描绘了 inOrderTraverse 方法的访问路径：
![二叉树](/assets/blogImg/erchashu-1.png)
