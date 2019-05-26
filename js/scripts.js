$(function () {
  closeAllPages();
  $("#mainPage").show();
  padin(".todopagecontent");
  $("#modal").click(modalClose);

  function closeAllPages() {
    $(".pages").hide();
  }

  function modalClose() {
    $("#taskOptionContent").slideUp();
    var sets = $("#settingsPageButton");
    sets.animate({width: '0', padding: '0'}, "slow");
    $("#modal").hide();
  }

  $("#taskOption").click(function () {
    $("#taskOptionContent").slideDown();
    $("#modal").show();
  });

  $("#settingsButton").click(function () {
    $("#settingsPageButton").show();
    var sets = $(".settingspagebutton");
    sets.animate({width: '150px', padding: '7px'}, "normal");
    $("#modal").show();
  });

  $("#completedPageButton").click(function () {
    $("#todoPage").hide();
    $("#taskType").html("Completed");
    $("#completedPage").show();
    modalClose();
    padin(".completedpagecontent");
  });
  $("#todoPageButton").click(function () {
    $("#completedPage").hide();
    $("#taskType").html("Todo");
    $("#todoPage").show();
    modalClose();
    padin(".todopagecontent");
  });

  $("#addTaskButton").click(function () {
    closeAllPages();
    $("#newTaskPage").show();
  });
  $(".backbutton").click(function () {
    //location.reload();
    closeAllPages();
    $("#mainPage").show();
  });
  $("#settingsPageButton").click(function () {
    closeAllPages();
    $("#settingsPageButton").hide();
    modalClose();
    $("#settingsPage").show();
  });

  function padin(value) {
    var checkie = $(value).html();
    if (!checkie) {
      var screenHeight = screen.height;
      var half = (screenHeight / 2) - 50;
      $(value).css({
        "margin-top": half + "px"
      });
    }
  }
  function checkInput() {
    var quickInput = $("#quickInput").val();
    if (quickInput === "") {
      $(".quicksubmit").hide();
      $("#quickInput").width("100%");
    } else {
      $(".quicksubmit").show();
      $("#quickInput").width("86%");
    }
  }
  $("#quickInput").on({
    keydown: function () {
      checkInput();
    },
    keyup: function () {
      checkInput();
    }
  });

  $("#newDate").on("click", function () {
    $("#newDateSet").show().click();
    // $("#newDate").hide();
  });

  /* Adding Dom */
  $("#quickSubmit").click(function () {
    document.getElementById("todoPageContent").style.marginTop = "";
    var quickinput = document.getElementById("quickInput").value;
    createItem(quickinput, "Overdue", null, null, "red");
    document.getElementById("quickInput").value = "";
    checkInput();

  });
  $("#saveButton").click(function () {
    document.getElementById("todoPageContent").style.marginTop = "";
    var inputvalue = document.getElementById("inputValue").value;
    var newdate = document.getElementById("newDate").value;
    var newtime = document.getElementById("newTime").value;
    createItem(inputvalue, "Today", newdate, newtime, "teal");
    closeAllPages();
    $("#mainPage").show();

  });
  function completedAction() {
    var liParent = this.parentNode.parentNode;
    var ulParent = this.parentNode.parentNode.parentNode;
    var divParent = ulParent.parentNode;
    //console.log(divParent);
    var parentId = divParent.parentNode;

    var completedpage = document.getElementById("completedPageContent");
    var todopage = document.getElementById("todoPageContent");

    var ultoday = document.createElement("ul");
    ultoday.id = "ulToday";
    var ulcomplete = document.createElement("ul");
    ulcomplete.id = "ulComplete";
    if (ulParent.id === "ulToday" || ulParent.id === "ulOverdue") {
      document.getElementById("completedPageContent").style.marginTop = "";
      console.log(ulParent);
      if ($("#completedPageContent").html()) {
        $("#ulComplete").append(this.parentNode.parentNode);
      } else {
        ulcomplete.appendChild(this.parentNode.parentNode);
        completedpage.appendChild(ulcomplete);
      }
      checkContents();
      padin(".todopagecontent");
      padin(".completedpagecontent");
    }
    if (ulParent.id === "ulComplete") {
      document.getElementById("todoPageContent").style.marginTop = "";
      console.log(ulParent);
      console.log(liParent.childNodes[3].innerText);
      var inputvalue = liParent.childNodes[3].innerText;
      var newtime = liParent.childNodes[0].innerText;
      var newdate = liParent.childNodes[1].innerText;
      createItem(inputvalue, "Today", newdate, newtime, "teal");
      var liParent = this.parentNode.parentNode;
      liParent.id = "liParentId";
      console.log(liParent);
      $("#liParentId").remove();
      checkContents();
      padin(".todopagecontent");
      padin(".completedpagecontent");
    }
    checkContents();
    padin(".todopagecontent");
    padin(".completedpagecontent");
  }
  function removeItem() {
    //var ulParent = this.parentNode.parentNode.parentNode;
    var liParent = this.parentNode.parentNode;
    liParent.id = "liParentId";
    console.log(liParent);
    $("#liParentId").remove();
    checkContents();
    padin(".todopagecontent");
    padin(".completedpagecontent");
  }
  function editPage() {
    closeAllPages();

    $("#editPage").show();
    $("#overDue").load("#overDue");
    var parent = this.parentNode;
    var submitEdit = document.getElementById("submitEditButton");
    var deleteEdit = document.getElementById("deleteEditButton");

    var inputvalue = parent.childNodes[3].innerText;
    var newdate = parent.childNodes[0].innerText;
    var newtime = parent.childNodes[1].innerText;

    document.getElementById("editValue").value = inputvalue;
    document.getElementById("editDate").value = newdate;
    document.getElementById("editTime").value = newtime;

    submitEdit.addEventListener("click", submitEditAction);
    function submitEditAction() {
      var gParent = parent.parentNode.childNodes;
      for (var i = 0; i < gParent.length; i++) {
        if (gParent[i].childNodes[3].innerText === inputvalue) {
          console.log(document.getElementById("editValue").value);
          var editedvalue = document.getElementById("editValue").value;
          var editedDate = document.getElementById("editDate").value;
          var editedTime = document.getElementById("editTime").value;
          gParent[i].childNodes[3].innerText = editedvalue;
          gParent[i].childNodes[0].innerText = editedDate;
          gParent[i].childNodes[1].innerText = editedTime;
        }
      }
      closeAllPages();
      $("#mainPage").show();
      checkContents();
      padin(".todopagecontent");
      padin(".completedpagecontent");

    }
    deleteEdit.addEventListener("click", deleteEditAction);

    function deleteEditAction() {
      parent.id = "parentid";
      console.log(parent);
      $("#parentid").remove();
      closeAllPages();
      $("#mainPage").show();
      checkContents();
      padin(".todopagecontent");
      padin(".completedpagecontent");
    }
  }


  function createItem(itemtext, period, duedate, duetime, color) {
    var todopage = document.getElementById("todoPageContent");
    var divOverdue = document.createElement('div');
    divOverdue.id = "divOverdue";
    var divToday = document.createElement("div");
    divToday.id = "divToday";
    divToday.classList.add("divtoday");

    var p = document.createElement('p');
    p.classList.add(color);
    p.classList.add(period);
    p.innerHTML = period || "No Due Date";
    var ulOverdue = document.createElement('ul');
    ulOverdue.id = "ulOverdue";
    var ulToday = document.createElement('ul');
    ulToday.id = "ulToday";
    ulToday.classList.add("ultoday");
    var li = document.createElement('li');

    var itemvalue = document.createElement('span');
    itemvalue.classList.add("itemvalue");
    itemvalue.innerHTML = itemtext;
    itemvalue.addEventListener("click", editPage);

    var buttons = document.createElement('button');
    buttons.classList.add("buttons");
    var button1 = document.createElement('button');
    var i1 = document.createElement('i');
    i1.classList.add("fa");
    i1.classList.add("fa-trash");
    button1.addEventListener("click", removeItem);
    var button2 = document.createElement('button');
    var i2 = document.createElement('i');
    i2.classList.add("fa");
    i2.classList.add("fa-check");
    button2.addEventListener("click", completedAction);
    var itemtime = document.createElement('span');
    itemtime.classList.add("itemtime");
    itemtime.classList.add(color);
    itemtime.innerHTML = duetime;
    var itemdate = document.createElement('span');
    itemdate.classList.add("itemdate");
    itemdate.classList.add(color);
    itemdate.innerHTML = duedate;


    button2.appendChild(i2);
    button1.appendChild(i1);
    buttons.appendChild(button2);
    buttons.appendChild(button1);
    li.appendChild(itemdate);
    li.appendChild(itemtime);
    li.appendChild(buttons);
    li.appendChild(itemvalue);
    if (p.innerHTML === "Today") {
      if ($("#divToday").html()) {
        $("#ulToday").append(li);
        //alert("hello world");
      } else {
        ulToday.appendChild(li);
        divToday.appendChild(p);
        divToday.appendChild(ulToday);
        todopage.appendChild(divToday);
      }
    }
    if (p.innerHTML === "Overdue") {
      if ($("#divOverdue").html()) {
        $("#ulOverdue").append(li);
        //alert("hello world");
      } else {
        ulOverdue.appendChild(li);
        divOverdue.appendChild(p);
        divOverdue.appendChild(ulOverdue);
        todopage.appendChild(divOverdue);
      }
    }
    padin(".todopagecontent");
    padin(".completedpagecontent");
  }
  function checkContents() {
    if (!$("#ulToday").html()) {
      $("#divToday").remove();
    } else {
      $("#divToday").show();
    }

    if (!$("#ulOverdue").html()) {
      $("#divOverdue").remove();
    } else {
      $("#divOverdue").show();
    }

    if (!$("#ulComplete").html()) {
      $("#ulComplete").remove();
    } else {
      $("#ulComplete").show();
    }

  }


});

