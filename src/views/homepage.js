export function makeHomePage(playerOptions, enemyOptions, backgroundOptions,  startGame) {
    return function () {

        let selectedPlayerIndex = 0
        let selectedEnemyIndex = 0
        let selectedBgIndex = 0

        function buildOptionSelectWrapper(txt, options, className, clickFunc, selectedIndex) {
            const wrapperDiv = document.createElement('div')
            wrapperDiv.classList.add("optionSelectHeadline")
            wrapperDiv.innerHTML = txt
            wrapperDiv.appendChild(buildOptions(options, className, clickFunc, selectedIndex))
            return wrapperDiv
        }

        function buildOptions(options, className, clickFunc, selectedIndex) {
            const wrapperDiv = document.createElement('div');
            wrapperDiv.classList.add("optionSelectWrapper");
            let i = 0;
            options.forEach(opt => {
                const img = new Image()
                img.src = opt
                img.onclick = clickFunc.bind(null, i)
                img.className = className
                if (selectedIndex === i) {
                    img.classList.add("selected")
                }
                wrapperDiv.appendChild(img)
                i++
            })
            return wrapperDiv;
        }

        function build() {
            const wrapper = document.getElementById("homePageWrapper")
            wrapper.prepend(buildOptionSelectWrapper("Background: ", backgroundOptions, "backgroundOption", (i) => {
                selectedBgIndex = i;

                let it = 0;
                [].forEach.call(document.getElementsByClassName("backgroundOption"), (el => {
                    el.classList.remove("selected")
                    if (it === selectedBgIndex)
                        el.classList.add("selected")
                    it++
                }))
            }, selectedBgIndex))


            wrapper.prepend(buildOptionSelectWrapper("Player: ", playerOptions, "playerOption", (i) => {
                selectedPlayerIndex = i;

                let it = 0;
                [].forEach.call(document.getElementsByClassName("playerOption"), (el => {
                    el.classList.remove("selected")
                    if (it === selectedPlayerIndex)
                        el.classList.add("selected")
                    it++
                }))
            }, selectedPlayerIndex))
        }

        function context() {

            function start() {
                startGame(backgroundOptions[selectedBgIndex], playerOptions[selectedPlayerIndex], enemyOptions[selectedEnemyIndex])
            }

            return Object.freeze({
                start
            })
        }

        return Object.freeze({
            id: "homepage",
            html: `
                <div id="homePageWrapper" class="homePageWrapper">
                    <button id="startBtn" onclick="start()">Start</button>
                </div>                       
            `,
            build,
            context
        })
    }
}