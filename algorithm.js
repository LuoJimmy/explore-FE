/*************** 排序算法 ****************/
// 1 冒泡排序
// 平均时间复杂度：O(n^2)，最坏时间复杂度：O(n^2)，最好时间复杂度：O(n)，空间复杂度：O(1)，稳定，内排
!(function () {
    function bubbling(arr) {
        // 判断是否为数组，还可以通过arr.constructor == Array; Array.isArray(arr);判断
        if (Object.prototype.toString.call(arr) !== '[object Array]') {
            return;
        }

        var temp;
        for (var i = 0, len = arr.length; i < len; i++) {
            for (var j = 0; j < len - i - 1; j++) {
                if (arr[j] > arr[j + 1]) {
                    temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                }
            }
        }
        return arr;
    }
    console.time('冒泡排序耗时：');
    console.log("冒泡排序：[8, 3, 5, 1, 90, 34]", bubbling([8, 3, 5, 1, 90, 34]));
    console.timeEnd('冒泡排序耗时：');
}());

// 2 选择排序
// 平均时间复杂度：O(n^2)，最坏时间复杂度：O(n^2)，最好时间复杂度：O(n^2)，空间复杂度：O(1)，不稳定，内排
!(function () {
    function selectionSort(arr) {
        if (arr.constructor !== Array) {
            return;
        }

        for (var i = 0, len = arr.length; i < len; i++) {
            let minIndex = i;
            for (var j = i + 1; j < len; j++) {
                if (arr[j] < arr[minIndex]) {
                    minIndex = j;
                }
            }
            var temp = arr[i];
            arr[i] = arr[minIndex];
            arr[minIndex] = temp;
        }

        return arr;
    }
    console.time('选择排序耗时：');
    console.log("选择排序：[8, 3, 5, 1, 90, 34]", selectionSort([8, 3, 5, 1, 90, 34]));
    console.timeEnd('选择排序耗时：');
})();

// 3 插入排序
// 平均时间复杂度：O(n^2)，最坏时间复杂度：O(n^2)，最好时间复杂度：O(n)，空间复杂度：O(1)，稳定，内排
!(function () {
    function insertSort(arr) {
        if (!Array.isArray(arr)) {
            return;
        }


        for (var i = 1, len = arr.length; i < len; i++) {
            var key = arr[i];

            for (var j = i - 1; j >= 0; j--) {// 可以使用while(key < arr[j]) {arr[j+1] = arr[j];j--}
                if (key < arr[j]) {
                    arr[j + 1] = arr[j]
                } else {
                    break;
                }
            }
            arr[j + 1] = key;
        }

        return arr;
    }
    console.time('插入排序耗时：');
    console.log("插入排序：[8, 3, 5, 1, 90, 34]", insertSort([8, 3, 5, 1, 90, 34]));
    console.timeEnd('插入排序耗时：');
})();

// 二分法插入排序
!(function () {
    function binaryInsertSort(arr) {
        if (!Array.isArray(arr)) {
            return;
        }


        for (var i = 1, len = arr.length; i < len; i++) {
            var key = arr[i], left = 0, right = i - 1;

            while (left <= right) {//二分法查找arr[i]应该排的位置
                var middle = Math.floor((left + right) / 2);
                if (key < arr[middle]) {
                    right = middle - 1;
                } else {
                    left = middle + 1;
                }
            }

            for (var j = i - 1; j >= left; j--) {
                arr[j + 1] = arr[j];
            }
            arr[left] = key;
        }

        return arr;
    }
    console.time('二分插入排序耗时：');
    console.log("二分法插入排序：[8, 3, 5, 1, 90, 34]", binaryInsertSort([8, 3, 5, 1, 90, 34]));
    console.timeEnd('二分插入排序耗时：');

})();

// 4 希尔排序
// 是插入排序的改良算法，步长从小到大，直至为1。步长选择是关键
// 平均时间复杂度：O(nlogn)，最坏时间复杂度：O(nlogn)，最好时间复杂度：O(nlogn)，空间复杂度：O(1)，不稳定，内排
(function () {

    function shellSort(arr) {
        if (!Array.isArray(arr)) {
            return;
        }

        var gap = 1;//步长
        var len = arr.length;
        while (gap < len / 5) {//动态设置步长
            gap = gap * 5 + 1;
        }

        while (gap >= 1) {
            for (var i = 0; i < len - gap; i++) {
                var temp = arr[i + gap];
                for (var j = i; j >= 0 && temp < arr[j]; j -= gap) {
                    arr[j + gap] = arr[j];
                }
                arr[j + gap] = temp;
            }

            gap = Math.floor(gap / 5);
        }
        return arr;
    }
    console.time('希尔排序耗时：');
    console.log("希尔排序：[8, 3, 5, 1, 90, 34]", shellSort([8, 3, 5, 1, 90, 34]));
    console.timeEnd('希尔排序耗时：');
})();

// 5 归并排序
// 平均时间复杂度：O(nlogn)，最坏时间复杂度：O(nlogn)，最好时间复杂度：O(nlogn)，空间复杂度：O(n)，稳定，外排
(function () {
    function mergeSort(arr) {
        if (!Array.isArray(arr)) {
            return;
        }

        if (arr.length < 2) {
            return arr;
        }

        var middle = arr.length / 2;
        var left = arr.slice(0, middle);
        var right = arr.slice(middle);

        return merge(mergeSort(left), mergeSort(right));
    }

    function merge(left, right) {
        if (!Array.isArray(left) || !Array.isArray(right)) {
            return;
        }

        var result = [];
        while (left.length !== 0 && right !== 0) {
            if (left[0] > right[0]) {
                result.push(right.shift());
            } else {
                result.push(left.shift());
            }
        }

        while (left.length > 0) {
            result.push(left.shift());
        }

        while (right.length > 0) {
            result.push(right.shift());
        }
        return result;
    }
    console.time('归并排序耗时：');
    console.log("归并排序：[8, 3, 5, 1, 90, 34]", mergeSort([8, 3, 5, 1, 90, 34]));
    console.timeEnd('归并排序耗时：');
})();

// 6 快速排序
// 平均时间复杂度：O(nlogn)，最坏时间复杂度：O(nlogn)，最好时间复杂度：O(n^2)，空间复杂度：O(logn)，不稳定，内排

// 1）以第一个数为基数
(function () {
    function quickSort(arr) {
        if (!Array.isArray(arr)) {
            return;
        }
        var len = arr.length,
            key = arr[0],
            i = 0,
            j = len - 1;

        if (j <= 0) {
            return arr;
        }

        for (; j > i; j--) {
            if (key > arr[j]) {
                arr[i++] = arr[j]
                for (; i < j; i++) {
                    if (key <= arr[i]) {
                        arr[j] = arr[i];
                        break;
                    }
                }
            }
        }
        arr[i] = key;

        return quickSort(arr.slice(0, i)).concat(key, quickSort(arr.slice(i + 1)));
    }
    console.time('快速排序耗时：');
    // console.log("快速排序：[3,44,38,5,47,15,36,26,27,2,46,4,19,50,48]", quickSort([3,44,38,5,47,15,36,26,27,2,46,4,19,50,48]));
    console.log("快速排序：[8, 3, 5, 1, 90, 34]", quickSort([8, 3, 5, 1, 90, 34]));
    console.timeEnd('快速排序耗时：');
})();

// 2）以中间数为基数,形象版
(function () {
    function quickSort(arr) {
        if (!Array.isArray(arr)) {
            return;
        }

        if (arr.length <= 1) {
            return arr;
        }

        var pivotIndex = Math.floor(arr.length / 2);
        var pivot = arr.splice(pivotIndex, 1)[0];
        var left = [], right = [];

        for (var i = 0, len = arr.length; i < len; i++) {
            if (arr[i] <= pivot) {
                left.push(arr[i]);
            } else {
                right.push(arr[i]);
            }
        }

        return quickSort(left).concat(pivot, quickSort(right));
    }

    console.time('快速排序2耗时：');
    console.log("快速排序：[3,44,38,5,47,15,36,26,27,2,46,4,19,50,48]", quickSort([3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48]));
    // console.log("快速排序：[8, 3, 5, 1, 90, 34]", quickSort([8, 3, 5, 1, 90, 34]));
    console.timeEnd('快速排序2耗时：');
})();

// 7 堆排序
// 平均时间复杂度：O(nlogn)，最坏时间复杂度：O(nlogn)，最好时间复杂度：O(nlogn)，空间复杂度：O(1)，不稳定，内排
(function () {
    function heapSort(arr) {
        if (!Array.isArray(arr)) {
            return;
        }

        if (arr.length <= 1) {
            return arr;
        }

        var heapSize = arr.length,
            temp;

        // 构建大堆
        for (var i = Math.floor(heapSize / 2) - 1; i >= 0; i--) {
            heapify(arr, i, heapSize);
        }

        // 堆排序
        for (var j = heapSize - 1; j >= 1; j--) {
            temp = arr[j];
            arr[j] = arr[0];
            arr[0] = temp;
            heapify(arr, 0, --heapSize);
        }

        return arr;
    }


    function heapify(arr, x, len) {
        var l = 2 * x + 1,
            r = 2 * x + 2,
            largest = x,
            temp;

        if (l < len && arr[l] > arr[largest]) {
            largest = l;
        }

        if (r < len && arr[r] > arr[largest]) {
            largest = r;
        }

        if (x !== largest) {
            temp = arr[x];
            arr[x] = arr[largest];
            arr[largest] = temp;

            heapify(arr, largest, len);
        }
    }

    console.time('堆排序耗时：');
    // console.log("快速排序：[3,44,38,5,47,15,36,26,27,2,46,4,19,50,48]", quickSort([3,44,38,5,47,15,36,26,27,2,46,4,19,50,48]));
    console.log("堆排序：[8, 3, 5, 1, 90, 34]", heapSort([8, 3, 5, 1, 90, 34]));
    console.timeEnd('堆排序耗时：');
})();

// 8 计数排序
// 平均时间复杂度：O(n+k)，最坏时间复杂度：O(n+k)，最好时间复杂度：O(n+k)，空间复杂度：O(k)，稳定，外排。（k为桶的数量）
(function () {
    function countingSort(arr) {
        var countingArr = [];
        for (var i = 0, len = arr.length; i < len; i++) {
            if (countingArr[arr[i]]) {
                countingArr[arr[i]]++;
            } else {
                countingArr[arr[i]] = 1;
            }
        }

        var k = 0;
        for (var j = 0, len2 = countingArr.length; j < len2; j++) {
            if (countingArr[j]) {
                while (countingArr[j]--) {
                    arr[k++] = j;
                }
            }
        }

        return arr;
    }

    console.time('计数排序耗时：');
    // console.log("快速排序：[3,44,38,5,47,15,36,26,27,2,46,4,19,50,48]", quickSort([3,44,38,5,47,15,36,26,27,2,46,4,19,50,48]));
    console.log("计数排序：[8, 3, 5, 1, 90, 34, 3, 1]", countingSort([8, 3, 5, 1, 90, 34, 3, 1]));
    console.timeEnd('计数排序耗时：');


})();


// 9 桶排序
// 平均时间复杂度：O(n+k)，最坏时间复杂度：O(n+k)，最好时间复杂度：O(n^2)，空间复杂度：O(n+k)，稳定，外排。（k为桶的数量）
(function () {
    function bucketSort(arr, num) {
        if (!Array.isArray(arr)) {
            return;
        }

        var bucket = [],
            max = arr[0],
            min = arr[0],
            arrLen = arr.length,
            step, //步长
            n = 0,
            index,
            temp,
            result = [];

        if (arrLen <= 1) {
            return arr;
        }

        index = arrLen / num;

        while (index < 2) { // 桶数不合理，一个桶就装下了，修正
            num--;
            index = arrLen / num;
        }

        for (var i = 1; i < arrLen; i++) {
            max = arr[i] > max ? arr[i] : max;
            min = arr[i] < min ? arr[i] : min;
        }

        step = (max - min + 1) / num;

        for (var j = 0; j < arrLen; j++) {
            index = Math.floor((arr[j] - min) / step);// num(arr[j]-min)/(max-min+1)，把数据放到接近的桶里

            if (bucket[index]) { // 如果桶有数据，通过插入排序对数据进行重新排序
                for (var k = bucket[index].length - 1; k >= 0 && arr[j] < bucket[index][k]; k--) {
                    bucket[index][k + 1] = bucket[index][k];
                }
                bucket[index][k + 1] = arr[j];
            } else { // 桶没有数组，初始化桶数据
                bucket[index] = [];
                bucket[index][0] = arr[j];
            }
        }

        while (n < num) { //拼接所有的桶
            result = result.concat(bucket[n++])
        }

        return result;
    }

    console.time('桶排序耗时：');
    // console.log("快速排序：[3,44,38,5,47,15,36,26,27,2,46,4,19,50,48]", quickSort([3,44,38,5,47,15,36,26,27,2,46,4,19,50,48]));
    console.log("桶排序：[8, 3, 5, 1, 90, 34, 3, 1]", bucketSort([8, 3, 5, 1, 90, 34, 3, 1], 3));
    console.timeEnd('桶排序耗时：');
})();

// 10 基数排序
// 平均时间复杂度：O(n*k)，最坏时间复杂度：O(n*k)，最好时间复杂度：O(n*k)，空间复杂度：O(n+k)，稳定，外排。（k为桶的数量）
// 基数排序是基于数据位数的一种排序算法。 
/* 它有两种算法 
①LSD–Least Significant Digit first 从低位（个位）向高位排。 
②MSD– Most Significant Digit first 从高位向低位（个位）排。 */

(function () {
    function radixLSDSort(arr) {
        if (!Array.isArray(arr)) {
            return;
        }

        if (arr.length <= 1) {
            return arr;
        }

        var bucket = [],
            bucketCount,
            arrLen = arr.length,
            max = arr[0],
            mod = 10,
            dev = 1;

        for (var i = 0; i < arrLen; i++) {
            max = max < arr[i] ? arr[i] : max;
        }

        bucketCount = `${max}`.length;// 最大数的长度

        while (bucketCount--) {
            for (var j = 0; j < arrLen; j++) {// 进桶
                var index = Math.floor((arr[j] % mod) / dev);// 获得所在桶的下标
                if(!bucket[index]) {
                    bucket[index] = [];
                } 
                bucket[index].push(arr[j]);
            }

            var pos = 0;
            for(var k = 0, len = bucket.length; k < len; k++) {// 出桶
                while(bucket[k] && bucket[k].length !== 0) {
                    arr[pos++] = bucket[k].shift();
                }
            }

            // 位数上升一位
            mod *= 10;
            dev *= 10;
        }
        return arr;
    }

    console.time('基数排序耗时：');
    // console.log("快速排序：[3,44,38,5,47,15,36,26,27,2,46,4,19,50,48]", quickSort([3,44,38,5,47,15,36,26,27,2,46,4,19,50,48]));
    console.log("基数排序：[8, 3, 5, 1, 90, 34, 3, 1]", radixLSDSort([8, 3, 5, 1, 90, 34, 3, 1]));
    console.timeEnd('基数排序耗时：');
})();



/*************** 查找算法 ****************/

// 1 顺序查找
(function() {
    function find(arr) {

    }

    console.log()
})();

// 2 二分查找

// 3 插值查找

// 4 斐波那契查找

// 5 数表查找

// 6 分块查找

// 7 哈希查找


console.log("反转数组，[1, 2, 3]", [1, 2, 3].reverse());

/* 阶乘计算x!，递归算法 */
!(function () {
    function factorial(n) {
        if (n == 1 || n == 0) {
            return 1
        } else {
            return n * factorial(n - 1);
        }
    }

    console.log("5!", factorial(5));

}());


