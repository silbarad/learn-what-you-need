import Vue from 'vue';

export const mainEventName = {
  userChanged: 'userChanged',
};

class MainEventBus extends Vue {}

export const mainEventBus = new MainEventBus();
