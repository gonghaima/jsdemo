var _ = require('./utils'),

    Game = function () {

        this.game       = false;
        this.position   = 1;
        this.interval   = null;
    };

_.extend(Game.prototype, {

    start: function () {

        this.game = true;
        this.interval = _.repeat(this.move, this, 1000);
    },

    move: function () {

        var thrown = _.rollDice(),
            logger = thrown + ' - ';

        this.position += thrown;
        if (this.position > 100) {
            console.log(logger + 'over shoot!');
            this.position -= thrown;
            return;
        }
        if (this.position === 100) {
            this.complete(thrown);
            return;
        }

        // divisible by 9
        if (this.position % 9 === 0) {

            this.position -= 3;
            this.position = Math.max(this.position, 0);

            logger += 'snake - ';
        }
        if (this.position === 25 || this.position === 55) {

            this.position += 10;
            logger += 'ladder - '
        }
        if (this.game) {
            console.log(logger + this.position);
        }
    },

    complete: function (finalThrow) {

        this.game = false;

        clearInterval(this.interval);

        console.log(finalThrow + ' - 100');
        console.log('Game complete');
    }
});

var snakesAndLadders = new Game();

snakesAndLadders.start();