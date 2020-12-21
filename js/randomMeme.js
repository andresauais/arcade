document.getElementById("memeButton").addEventListener("click", ()=>{
    disappearGamesContainer();
    memeArr = [
        "url('https://s3media.247sports.com/Uploads/Assets/373/748/9748373.PNG')",
        "url('https://img.wattpad.com/27d988995f29719dbc177fa61b7a36a6698cd264/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f776174747061642d6d656469612d736572766963652f53746f7279496d6167652f776e7059444f6f6e66726a3670413d3d2d3730323335333132342e313538633632356564316434326431643737373339313736383432372e6a7067?s=fit&w=720&h=720')",
        "url('https://www.testbytes.net/wp-content/uploads/2019/06/Untitled-53-300x300.png')",
        "url('https://i.pinimg.com/originals/4f/82/8d/4f828d05f82b8b7aedfe8be6a7d9d2a3.png')",
        "url('https://res.cloudinary.com/practicaldev/image/fetch/s--AHhADEXH--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://pics.me.me/trying-to-learn-any-programming-language-100-just-a-little-7917454.png')",
        "url('https://i.pinimg.com/736x/43/c7/38/43c738b17972e3adec62a943bb7b9043.jpg')",
        "url('https://external-preview.redd.it/Jy6TzYfcPAaa9QQ4zUIQNhs14DlmOy5LwZlHXSRz1G4.jpg?auto=webp&s=00db864d7ea4edece24511e3cc43366ac923ad31')",
        "url('https://i.pinimg.com/736x/89/c4/52/89c452c1e596c77dbb7fe3a17371c828.jpg')",
        "url('https://www.testbytes.net/wp-content/uploads/2019/06/Untitled-63.png')",
        "url('https://miro.medium.com/max/1634/0*r6iQzljiuJavVxRM')",
        "url('https://www.siliconrepublic.com/wp-content/uploads/2015/05/Coding.png')"
    ];

    var memeContainer = document.createElement("div");
    memeContainer.setAttribute("id", "memeContainer");
    
    var memeGrid = document.createElement("div");
    memeGrid.setAttribute("id", "memeGrid");

    var getMemeBtn = document.createElement("button");
    getMemeBtn.innerHTML = "Get Random Meme";
    getMemeBtn.addEventListener("click", ()=>{
        getMeme();
    })
    memeContainer.append(memeGrid);
    memeContainer.append(getMemeBtn);
    var backBtn = document.createElement("button");
    backBtn.innerHTML = "Back to Games";
    backBtn.addEventListener("click", ()=>{
        memeContainer.remove();
        gamesContainer.style.display = "flex";
        /*gamesContainer.style.flexDirection = "column";*/
    });

    memeContainer.append(backBtn);
    gamingArea.append(memeContainer);

    function getMeme() {
        let randomNumber = Math.floor(Math.random() * (memeArr.length));
        memeGrid.style.backgroundImage = memeArr[randomNumber];
    }
});
