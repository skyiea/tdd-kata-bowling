function isStrike(pins: number) {
    return pins === 10;
}

function isSpare(pins1roll: number, pins2roll: number) {
    return pins1roll + pins2roll === 10;
}

class Frame {
    score: number = 0;
    rolls: number = 0;
    maxRolls: number = 2;
    private bonusRolls: number = 0;

    roll(pins) {
        if (this.isEnded()) {
            return;
        }

        if (isStrike(pins)) {
            this.bonusRolls = 2;
        } else if (this.rolls === 1 && isSpare(this.score, pins)) {
            this.bonusRolls = 1;
        }

        this.rolls += 1;
        this.score += pins;
    }

    useBonus(pins: number) {
        if (this.bonusRolls > 0) {
            this.score += pins;
            this.bonusRolls -= 1;
        }
    }

    isEnded() {
        return this.rolls === 2 || isStrike(this.score);
    }
}

class LastFrame extends Frame {
    roll(pins) {
        if (this.isEnded()) {
            return;
        }

        if (isStrike(pins) || isSpare(this.score, pins)) {
            this.maxRolls = 3;
        }

        this.rolls += 1;
        this.score += pins;
    }

    isEnded() {
        return this.rolls === this.maxRolls;
    }
}

export default class BowlingGame {
    private currentFrameIndex: number = 0;
    private frames: Array<Frame> = new Array(10).fill(0).map((_, index) =>  index < 9 ? new Frame() : new LastFrame());

    private get currentFrame(): Frame {
        return this.frames[this.currentFrameIndex];
    }

    private useBonuses(pins: number) {
        this.frames.forEach((frame) => frame.useBonus(pins));
    }

    private goToNextFrame() {
        this.currentFrameIndex += 1;
    }

    private shouldGoToTheNextFrame() {
        return this.currentFrame.isEnded() && this.frames[this.currentFrameIndex + 1];
    }

    roll(pins: number) {
        if (pins < 0 || pins > 10) {
            throw new Error('Incorrect pins value');
        }

        this.useBonuses(pins);
        this.currentFrame.roll(pins);

        if (this.shouldGoToTheNextFrame()) {
            this.goToNextFrame();
        }
    }

    getScore() {
        return this.frames.reduce((acc: number, frame: Frame) => acc + frame.score, 0);
    }
}
