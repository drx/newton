/*
 * Typing mode plugin by Luan Fonseca (December 2014)
 * https://github.com/brianreavis/selectize.js/blob/5d81539d677e8c2411215a1fb81789a8006c77f2/src/plugins/typing_mode/plugin.js#L1
 *
 * Modified by Jess Mann (June 2017)
 * https://github.com/selectize/selectize.js/issues/670#issuecomment-310210542
 *
 * Modified by me
 *
 * Selectize version 0.12.4
 */
Selectize.define('typing_mode', function (options) {
    var self = this;

    this.setup = (function () {
        var original = self.setup;
        self.updating = false;

        return function () {
            original.apply(this, arguments);

            this.on('type', function () {
                /* Activate the add option on typing */
                $active = self.$dropdown_content.find('[data-selectable]:first');
                self.setActiveOption($active);

            });

            this.on('dropdown_open', function () {
                //console.log(self.getValue());
                self.previousValue = self.getValue();
                var option = self.getOption(self.previousValue);
                //console.log(option.text().trim());

                //self.$control_input.attr('value', option.text().trim());
                self.setTextboxValue(option.data("value").trim());

                self.$control_input.css({
                    opacity: '1',
                    width: '100%',
                    position: 'relative'
                });
                self.$control.find('.item').hide();

                self.positionDropdown();

                self.items = [];
                self.setCaret(0);

                pauseDemo();
            });

            this.$control_input.on('blur', function () {
                self.$control.find('.item').show();

                var value = self.getValue() || self.previousValue;

                /**
                 * Avoid infinite loop. self.setValue calls blur() again
                 *     even if we pass true to the second param.
                 */
                if (self.updating)
                    return;

                self.updating = true;
                self.setValue(value);
                self.updating = false;

                unpauseDemo();
            });
        };
    })();
});

Selectize.prototype.positionDropdown = function() {
    var $control = this.$control;
    var offset = $control.position();

    console.log(offset.top, $control.outerHeight(true), $control);
    offset.top += $control.outerHeight(false);

    this.$dropdown.css({
        width : $control[0].getBoundingClientRect().width,
        top   : offset.top,
        left  : offset.left
    });
}

Selectize.prototype.selectAdjacent = function(direction) {
    this.refreshOptions(false);
    var $option = this.getOption(this.getValue());

    var $adjacent = this.getAdjacentOption($option, direction);
    if ($adjacent.length) {
        this.setActiveOption($adjacent, true, true);
        this.onOptionSelect({currentTarget: $adjacent});
    }
}

Selectize.prototype.setValueSilent = function(value) {
    this.silentChange = true;
    this.setValue(value);
    this.silentChange = false;
}

function initSelectize(gl) {
    $('select#equation').selectize({
        plugins: ['typing_mode'],
        create: function (input) {
            return {value: input, text: input, created: true, optgroup: "user"};
        },
        items: [equations[0].value],
        createOnBlur: true,
        highlight: false,
        addPrecedence: true,
        valueField: "value",
        onChange: function () {
            setEquation(gl);
            if (!this.silentChange) {
                stopDemo();
            }
        },
        score: function () {
            return function (item) {
                var created = item.created === true ? 1 : 0;
                return 1 + created;
            };
        },
        options: equations,
        optgroups: [
            {value: "user", label: "Your functions"},
            {value: "polynomials", label: "Polynomials"},
            {value: "trigonometric", label: "Trigonometric functions"},
            {value: "demos", label: "Demos"},
            {value: "other", label: "Other"},
        ],
        render: {
            option: function (item, escape) {
                return '<div class="option">' + item.text + '</div>';
            },
            item: function (item, escape) {
                return '<div class="item">' + item.text + '</div>';
            }
        }

    });
}
