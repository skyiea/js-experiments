var time_el, out_text, start_time, timer_instance,

    initDOM_Elements = function () {
        time_el = document.getElementById('time_r');
        out_text = document.getElementById('inp');
    },
    initEvents = function () {
        out_text.addEventListener('keypress', function (e) {
            if (e.keyCode === 13) {
                result();
            }
        });
    },

    Timer = function (func, interval) {
        var timer_handler;

        this.start = function () {
            timer_handler = window.setInterval(func, interval);
        };
        this.stop = function () {
            window.clearInterval(timer_handler);
        };
    },
    state = 'idle',

    result = function () {
        var result_speed, message,
            inp_text = document.getElementById('text').innerHTML,
            user_text = out_text.value;

        timer_instance.stop();

        if (inp_text === user_text) {
            result_speed = window.parseInt(
                user_text.length / ((Date.now() - start_time) / 1000 / 60));
            message = 'Швидкість набору: ' + result_speed + ' зн/хв.';
        } else {
            message = 'Невірно введений текст! Спробуйте знову';
        }

        if (window.confirm(message + '\nСпробувати ще раз?')) {
            window.location.reload();
        }
    },

    timer = function () {
        var new_time,
            previous_time = Number(time_el.innerHTML);

        if (state === 'prepare') {
            new_time = previous_time - 1;

            time_el.innerHTML = new_time;

            if (new_time === 0) {
                state = 'start';
                start_time = Date.now();
                setFocus();
            }
        } else if (state === 'start') {
            time_el.innerHTML = previous_time + 1;
        }
    },

    setFocus = function () {
        out_text.disabled = false;
        out_text.focus();
    },

    init = function () {
        state = 'prepare';
        timer_instance = new Timer(timer, 1000);
        initDOM_Elements();
        initEvents();
        timer_instance.start();
    };

document.addEventListener('DOMContentLoaded', init);