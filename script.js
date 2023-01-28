let followers = [];
let following = [];
let followList = null;

(async function () {
    await $("a[href*='/followers/']").click();

    await getFollowersList();

    await scrollToBottom(followList);

    await getFollowers();

    console.log(followers);

    // await $("a[href*='/following/']").click();
})();

async function getFollowersList() {
    return new Promise((resolve) => {
        try {
            console.log("Getting follow list");
            followList = document.querySelector("h1 div").parentElement.parentElement.parentElement.parentElement.parentElement.children[1];
            console.log(followList);
            if (followList === null) {
                setTimeout(() => getFollowersList().then(resolve), 500);
            } else {
                resolve();
            }
        } catch (e) {
            console.log("Failed to get follow list");
            setTimeout(() => getFollowersList().then(resolve), 500);
        }
    });
}

async function scrollToBottom(div) {
    return new Promise((resolve) => {
        console.log("Scrolling to bottom");
        if (div.scrollTop + div.clientHeight < div.scrollHeight) {
            div.scrollTop = div.scrollHeight;
            setTimeout(() => scrollToBottom(div).then(resolve), 500);
        } else {
            resolve();
        }
    });
}

async function getFollowers() {
    return new Promise((resolve) => {
        console.log("Getting followers");
        var buttons = document.getElementsByTagName("button");
        for (var i = 0; i < buttons.length; i++) {
            if (buttons[i].innerHTML === "Remove") {
                followers.push(buttons[i].parentElement.parentElement.children[1].children[0].children[0].children[0].children[0].children[0].children[0].children[0].children[0].innerHTML);
            }
        }
        resolve();
    });
}