import { Component } from '@angular/core';
const list = {
  0: { id: 72, name: "David Beckham" },
  1: {
    0: [
      { id: 11, name: "Brad Pitt" },
      { id: 1, name: "Alexandra Daddario" },
    ],
    1: { id: 19, name: "Michael Myers" },
  },
  2: { 0: { 0: [{ id: 33, name: "Matthew Heafy" }] } },
  3: [
    [
      { id: 4, name: "John Petrucci" },
      { id: 55, name: "Wayne Rooney" },
    ],
    [
      { id: 57, name: "Garbeil Tronpis" },
      { id: 10, name: "Donald Trump" },
      { 0: { id: 69, name: "[Object object]" } },
    ],
    { id: 13, name: "Ester Exposito" },
    {
      0: [
        { id: 3, name: "Jordan Rudess" },
        { id: 8, name: "Michael Jackson" },
      ],
      1: { id: 99, name: "undefined undefined" },
    },
    { id: 47, name: "Raul Garcia" },
    { id: 40, name: "Benito Martinez" },
  ],
  4: [
    { id: 68, name: "Lionel Messi" },
    { id: 84, name: "Kobe Bryant" },
    { id: 71, name: "Gilgamesh" },
    [
      { id: 7, name: "Miyamoto Musashi" },
      {
        0: [{ id: 23, name: "Arthur Pendragon" }],
        1: [{ id: 5, name: "Bedivere" }],
      },
      { id: 96, name: "Lord Valdomero" },
      { id: 18, name: "Literalmente nadie" },
    ],
  ],
};

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  timeQuick: any = '';
  timeMerge: any = '';
  quickArr: any = [];
  mergeArr: any = [];
  ver = [];
  title = '???';
  time = '???';
  mejor = "";
  constructor() {
    var arreglo = [];
    Object.keys(list).forEach(function (key) {
      arreglo.push(list[key])
    });
    this.quicksort();
    this.mergeSort(arreglo);

    if (this.timeQuick < this.timeMerge) {
      this.mejor = "El mejor tiempo fue el Quick Arreglo";
    } else {
      this.mejor = "El mejor tiempo fue el Merge Arreglo";
    }

    this.mostrar('quick');
  }

  mostrar(string) {
    if (string == 'quick') {
      this.ver = this.quickArr;
      this.title = 'quick';
      this.time = this.timeQuick;
    } else if (string == 'merge') {
      this.ver = this.mergeArr;
      this.title = 'merge';
      this.time = this.timeMerge;
    }
  }

  mergeSort(arr) {
    var a = performance.now();
    if (arr.length <= 1) return arr;
    let mid = Math.floor(arr.length / 2);
    let left = this.mergeSort(arr.slice(0, mid));
    let right = this.mergeSort(arr.slice(mid));
    console.log(this.merge(left, right))
    this.mergeArr = this.merge(left, right);
    var b = performance.now();
    this.timeMerge = b - a;
    return this.merge(left, right);
  };

  merge(arr1, arr2) {
    let sorted = [];

    while (arr1.length && arr2.length) {
      if (arr1[0] < arr2[0]) sorted.push(arr1.shift());
      else sorted.push(arr2.shift());
    };

    return sorted.concat(arr1.slice().concat(arr2.slice()));
  };

  quicksort() {
    var a = performance.now();
    console.log('quick');
    var arr = [];
    Object.keys(list).forEach(function (key) {
      arr.push(list[key])
    });
    // first call to quick sort
    var sort = this.quickSort(arr, 0, arr.length - 1);
    var b = performance.now();
    this.quickArr = sort;
    this.timeQuick = (b - a);
  }

  swap(items, leftIndex, rightIndex) {
    var temp = items[leftIndex];
    items[leftIndex] = items[rightIndex];
    items[rightIndex] = temp;
  }
  partition(items, left, right) {
    var pivot = items[Math.floor((right + left) / 2)],
      i = left,
      j = right;
    while (i <= j) {
      while (items[i] < pivot) {
        i++;
      }
      while (items[j] > pivot) {
        j--;
      }
      if (i <= j) {
        this.swap(items, i, j);
        i++;
        j--;
      }
    }
    return i;
  }

  quickSort(items, left, right) {
    var index;
    if (items.length > 1) {
      index = this.partition(items, left, right);
      if (left < index - 1) {
        this.quickSort(items, left, index - 1);
      }
      if (index < right) {
        this.quickSort(items, index, right);
      }
    }
    return items;
  }
}