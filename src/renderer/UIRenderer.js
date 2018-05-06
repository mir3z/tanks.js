export default function UIRenderer(html) {
    const { div, txt, button, append, update,  remove } = html;

    const $dialog = (children) => div({ className: "dialog" }, children);

    return {
        roundSummaryDialog({ players, round, onNextRound }) {
            const $header = () => div({ className: "rank-table-header" }, txt("Rankings"));
            const $subHeader = () => div({ className: "rank-table-subheader"}, txt(`Round #${ round + 1}`));
            const $rank = num => div({ className: "player-rank" }, txt(`#${ num + 1 }`));
            const $name = p => div({ className: "player-name", style: { color: p.tank.color } }, txt(p.name));
            const $score = p => div({ className: "player-score" }, txt(p.score));
            const $tbl = rows => div({ className: "rank-table" }, rows);
            const $rankRow = (p, i) => div({ className: "rank-row" }, [ $rank(i), $name(p), $score(p) ]);
            const $okButton = () => button({ className: "btn rank-table-next-btn" }, txt("Next Round"));

            const rows = players
                .slice(0)
                .sort()
                .map($rankRow);

            const okButton = $okButton();
            const dialog = $dialog([ $header(), $subHeader(), $tbl(rows), okButton ]);

            okButton.addEventListener("click", () => {
                onNextRound();
                remove(dialog);
            });

            append(dialog);
        },


        statusBar() {
            const $statusBar = children => div({ className: "status-bar" }, children);
            const $label = ({ className, ...rest }, text) =>
                div({ className: `status-bar-label ${ className }`, ...rest }, txt(text));

            let $$instance;

            const updateInstance = (newNode) => {
                $$instance = update(newNode, $$instance);
            };

            return {
                render({ player, wind }) {
                    const { tank, armory } = player;
                    const angle = tank.angle > 90 ? 180 - tank.angle : tank.angle;
                    const windDir = wind > 0
                        ? "▶"
                        : wind < 0
                            ? "◀"
                            : "●";

                    const $power = () => $label({ className: "status-bar-power" }, `Power: ${ tank.power }`);
                    const $angle = () => $label({ className: "status-bar-angle" }, `Angle: ${ angle }`);
                    const $stamina = () => $label({ className: "status-bar-stamina" }, `Stamina: ${ tank.stamina }`);
                    const $player = () => $label(
                        { className: "status-bar-player", style: { color: tank.color } },
                        player.name
                    );
                    const $weapon = () => div({ className: "status-bar-weapon" }, [
                        div({ className: "status-bar-weapon-icon", style: { backgroundImage: `url(${ armory.weapon().icon })` } }),
                        $label({ className: "status-bar-weapon-title" }, armory.weapon().name)
                    ]);
                    const $wind = () => $label({ className: "status-bar-wind" }, `Wind: ${ Math.abs(wind) } ${ windDir }`);

                    const root = $statusBar([ $power(), $angle(), $stamina(), $player(), $weapon(), $wind() ]);

                    updateInstance(root);
                }
            };
        }
    };
}