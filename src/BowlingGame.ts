function isStrike(pins: number) {
    return pins === 10;
}

function isSpare(pins1roll: number, pins2roll: number) {
    return pins1roll + pins2roll === 10;
}

class Frame {
    score: number = 0;
    rolls: number = 0;
    bonusRolls: number = 0;

    roll(pins) {
        if (isStrike(pins)) {
            this.bonusRolls = 2;
        } else if (this.rolls === 1 && isSpare(this.score, pins)) {
            this.bonusRolls = 1;
        }

        this.rolls++;
        this.score += pins;
    }

    isEnded() {
        return this.rolls === 2 || this.score === 10;
    }
}

export default class BowlingGame {
    private score: number =  0;
    private bonusRolls: number = 0;
    private previousRollPins: number | null = null;
    private frames: Array<Frame> = new Array(10).fill(new Frame());

    roll(pins: number) {
        if (pins < 0 || pins > 10) {
            throw new Error('Incorrect pins value');
        }

        // applying bonus
        if (this.bonusRolls) {
            if (this.bonusRolls === 3) {
                this.score += pins * 2;
                this.bonusRolls -= 2;
            } else {
                this.score += pins;
                this.bonusRolls -= 1;
            }
        }

        // spare bonus
        if (this.previousRollPins !== null && isSpare(this.previousRollPins, pins)) {
            this.bonusRolls++;
        }

        this.previousRollPins = pins;

        if (isStrike(pins)) {
            this.bonusRolls += 2;
        }

        this.score += pins;
    }

    getScore() {
        return this.score;
    }
}
