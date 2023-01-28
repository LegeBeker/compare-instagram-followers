let followers = [];
let following = [];
let followList = null;

(async function () {
    var overlay = document.createElement("div");
    overlay.style.position = "fixed";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    overlay.style.backgroundColor = "white";
    overlay.style.color = "black";
    overlay.classList.add("overlay");

    var progressDiv = document.createElement("div");
    progressDiv.style.position = "fixed";
    progressDiv.style.top = "0";
    progressDiv.style.left = "0";
    progressDiv.style.width = "100%";
    progressDiv.style.height = "100%";
    progressDiv.style.backgroundColor = "white";
    progressDiv.style.display = "flex";
    progressDiv.style.justifyContent = "center";
    progressDiv.style.alignItems = "center";
    progressDiv.classList.add("progressDiv");

    overlay.appendChild(progressDiv);
    document.body.appendChild(overlay);

    await closeAll()

    await getFollowers();
    await getFollowing();

    document.querySelector(".progressDiv").innerHTML += "Done.<br>";
    console.log("Done");
    console.log("Followers: " + followers.length);
    console.log("Following: " + following.length);

    var notFollowingBack = [];
    for (var i = 0; i < following.length; i++) {
        if (followers.indexOf(following[i]) === -1) {
            notFollowingBack.push(following[i]);
        }
    }

    var notFollowing = [];
    for (var i = 0; i < followers.length; i++) {
        if (following.indexOf(followers[i]) === -1) {
            notFollowing.push(followers[i]);
        }
    }

    console.log("Not following back: " + notFollowingBack.length);
    console.log(notFollowingBack);

    console.log("Not following: " + notFollowing.length);
    console.log(notFollowing);

    document.querySelector(".progressDiv").remove();

    var div = document.createElement("div");
    div.style.width = "50%";

    var h1 = document.createElement("h1");
    h1.innerHTML = "Not following back";
    h1.style.fontSize = "2em";
    h1.style.color = "black";
    h1.style.margin = "20px";
    div.appendChild(h1);

    var ul = document.createElement("ul");
    for (var i = 0; i < notFollowingBack.length; i++) {
        var li = document.createElement("li");
        li.innerHTML = notFollowingBack[i];
        ul.appendChild(li);
    }
    ul.padding = "40px";
    div.appendChild(ul);

    document.querySelector(".overlay").appendChild(div);

    var div = document.createElement("div");
    div.style.width = "50%";

    var h1 = document.createElement("h1");
    h1.innerHTML = "Not following";
    h1.style.fontSize = "2em";
    h1.style.color = "black";
    h1.style.margin = "20px";
    div.appendChild(h1);

    var ul = document.createElement("ul");
    for (var i = 0; i < notFollowing.length; i++) {
        var li = document.createElement("li");
        li.innerHTML = notFollowing[i];
        ul.appendChild(li);
    }
    ul.padding = "40px";
    div.appendChild(ul);

    document.querySelector(".overlay").appendChild(div);
})();

async function getFollowers() {
    document.querySelector("a[href*='/followers/']").click();

    await getFollowList(1);
    await scrollToBottom(followList);
    await getFollow("Followers");
    document.querySelector(".progressDiv").innerHTML += "Done getting followers<br><br>";
}

async function getFollowing() {
    document.querySelector("a[href*='/following/']").click();

    await getFollowList(2);
    await scrollToBottom(followList);
    await getFollow("Following");
    document.querySelector(".progressDiv").innerHTML += "Done getting following<br><br>";
}

async function getFollowList(child) {
    return new Promise((resolve) => {
        try {
            followList = null;
            document.querySelector(".progressDiv").innerHTML += "Getting list element<br>";
            console.log("Getting list element");
            followList = document.querySelector("h1 div").parentElement.parentElement.parentElement.parentElement.parentElement.children[child];
            if (followList === null || followList === undefined) {
                setTimeout(() => getFollowList(child).then(resolve), 500);
            } else {
                document.querySelector(".progressDiv").innerHTML += "Got list element<br>";
                resolve();
            }
        } catch (e) {
            document.querySelector(".progressDiv").innerHTML += "Failed to get list element<br>";
            console.log("Failed to get list element");
            setTimeout(() => getFollowList(child).then(resolve), 500);
        }
    });
}

async function scrollToBottom(div) {
    return new Promise((resolve) => {
        document.querySelector(".progressDiv").innerHTML += "Loading list<br>";
        console.log("Loading list");
        if (div.scrollTop + div.clientHeight < div.scrollHeight) {
            div.scrollTop = div.scrollHeight;
            setTimeout(() => scrollToBottom(div).then(resolve), 1500);
        } else {
            resolve();
        }
    });
}

async function getFollow(listType) {
    return new Promise((resolve) => {
        document.querySelector(".progressDiv").innerHTML += "Getting " + listType + "<br>";
        console.log("Getting followers");
        var buttons = document.getElementsByTagName("button");
        for (var i = 0; i < buttons.length; i++) {
            if (listType === "Followers" && buttons[i].innerHTML === "Remove") {
                var follower = buttons[i].parentElement.parentElement.children[1].children[0].children[0].children[0].children[0].children[0].children[0].children[0].children[0].innerHTML;
                if (follower.indexOf("<") !== -1) {
                    follower = follower.substring(0, follower.indexOf("<"));
                }
                followers.push(follower);
            } else if (listType === "Following" && buttons[i].children[0] && buttons[i].children[0].children[0] && buttons[i].children[0].children[0].innerHTML === "Following") {
                var follower = buttons[i].parentElement.parentElement.children[1].children[0].children[0].children[0].children[0].children[0].children[0].children[0].children[0].innerHTML;
                if (follower.indexOf("<") !== -1) {
                    follower = follower.substring(0, follower.indexOf("<"));
                }
                following.push(follower);
            }
        }
        resolve();
    });
}

async function closeAll() {
    return new Promise((resolve) => {
        var close = document.querySelector("svg[aria-label='Close']");
        if (close) {
            close.parentElement.click();
            setTimeout(() => closeAll().then(resolve), 500);
        } else {
            resolve();
        }
    });
}