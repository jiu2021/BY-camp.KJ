var app = new Vue({
  el: "#app",
  data: {
    message: "",
    itemsList: [],
    counter: 0,
    allStatus: true,
    displayStatus: "All",
    displayClearButton: false,
  },
  mounted: function() {
    //载入数据
    if (JSON.parse(localStorage.getItem("items")) != null) {
      var oldItem = JSON.parse(localStorage.getItem("items"));
      this.itemsList = oldItem;
    }
    var that = this;
    this.$nextTick(function() {
      //DOM渲染后调用
      that.counter = 0;
      for (var i = 0; i < that.itemsList.length; i++) {
        if (that.itemsList[i].status) {
          that.counter++;
        }
      }
    });
  },

  updated: function() {
    //刷新待办个数
    if (this.counter == 0) {
      this.allStatus = false;
    } else {
      this.allStatus = true;
    }
    //刷新ClearCompleted按钮
    for (var i = 0; i < this.itemsList.length; i++) {
      if (!this.itemsList[i].status) {
        this.displayClearButton = true;
        break;
      }
    }
    if (i == this.itemsList.length) {
      this.displayClearButton = false;
    }
  },

  methods: {
    buildNew: function() {
      if (this.message.trim() != "") {
        var item = new Object();
        item.name = this.message;
        item.status = true;
        this.itemsList.push(item);
        this.counter++;
        //写入local storage
        localStorage.setItem("items", JSON.stringify(this.itemsList));
        //清空输入栏
        this.message = "";
      }
    },

    changeStatus: function(index) {
      this.itemsList[index].status = !this.itemsList[index].status;
      //更新local storage
      localStorage.setItem("items", JSON.stringify(this.itemsList));
      //计数
      this.counter = 0;
      for (var i = 0; i < this.itemsList.length; i++) {
        if (this.itemsList[i].status)
          this.counter++;
      }
    },

    changeAllstatus: function() {
      if (this.allStatus) {
        for (var i = 0; i < this.itemsList.length; i++) {
          this.itemsList[i].status = false;
        }
      } else {
        for (var i = 0; i < this.itemsList.length; i++) {
          this.itemsList[i].status = true;
        }
      }
      this.allStatus = !this.allStatus;
      //更新local storage
      localStorage.setItem("items", JSON.stringify(this.itemsList));
      //计数
      this.counter = 0;
      for (var i = 0; i < this.itemsList.length; i++) {
        if (this.itemsList[i].status)
          this.counter++;
      }
    },

    deleteItem: function(index) {
      if (confirm("Do you want to delete this item permanently?")) {
        if (this.itemsList[index].status) {
          this.counter--;
        }
        this.itemsList.splice(index, 1);
        //更新local storage
        localStorage.setItem("items", JSON.stringify(this.itemsList));
      }
    },

    istrue: function(index) {
      if (this.displayStatus == "All") {
        return true;
      } else if (this.displayStatus == "Active") {
        return this.itemsList[index].status;
      } else if (this.displayStatus == "Completed") {
        return !this.itemsList[index].status;
      }
    },

    clearCompleted: function() {
      if (confirm("Do you want to delete all completed items permanently?")) {
        for (var i = this.itemsList.length - 1; i >= 0; i--) {
          if (!this.itemsList[i].status) {
            this.itemsList.splice(i, 1);
          }
        }
        //更新local storage
        localStorage.setItem("items", JSON.stringify(this.itemsList));
      }
    },

    getUpdate: function(index) {
      if (this.message.trim() != "") {
        this.itemsList[index].name = this.message;
        this.message = "";
      }
      //更新local storage
      localStorage.setItem("items", JSON.stringify(this.itemsList));
      //收起修改框
      var list = document.getElementsByClassName("update");
      list[index].style.display = "none";
    },

    displayUpdate: function(index) {
      //展示输入框
      var list = document.getElementsByClassName("update");
      list[index].style.display = "";
    }
  }
})