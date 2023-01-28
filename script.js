let followers = [];
let following = [];
let followList = null;

$("a[href*='/followers/']").click();

getFollowList();

scrollToBottom(followList);

getFollowers();

console.log(followers);

// $("a[href*='/following/']").click();


function scrollToBottom(div) {
    if (div.scrollTop + div.clientHeight < div.scrollHeight) {
        div.scrollTop = div.scrollHeight;
        setTimeout(scrollToBottom, 500);
    }
}

function getFollowList() {
    try {
        followList = $("h1 div").parentElement.parentElement.parentElement.parentElement.parentElement.children[1];
        if (followList === null) {
            setTimeout(getFollowList, 500);
        }
    } catch (e) {
        setTimeout(getFollowList, 500);
    }
}

function getFollowers() {
    if (followList.scrollTop + followList.clientHeight < followList.scrollHeight) {
        var buttons = document.getElementsByTagName("button");
        for (var i = 0; i < buttons.length; i++) {
            if (buttons[i].innerHTML === "Remove") {
                followers.push(buttons[i].parentElement.parentElement.children[1].children[0].children[0].children[0].children[0].children[0].children[0].children[0].children[0].innerHTML);
            }
        }
    } else {
        setTimeout(getFollowers, 500);
    }
}