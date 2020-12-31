import { FilestoreMock } from '@/services/__tests__';
import DeskVue from '@/modules/Desk/Desk.vue';
import factory from './__factory';
import deskProp from '../types/deskProp';

const filestoreMock = new FilestoreMock();

const createComponent = () => {
  const component = factory(DeskVue, filestoreMock);
  return component;
};

describe('modules/Desk/Index.vue', () => {
  it('Check Vue component is created', async () => {
    const wrap = createComponent();
    /* eslint-disable  @typescript-eslint/no-explicit-any */
    const vm = (wrap.vm as any) as deskProp & Vue;
    await vm.$nextTick();

    expect(vm).toBeInstanceOf(Object);
    expect(vm.fbs).toBeInstanceOf(Object);
  });
});
