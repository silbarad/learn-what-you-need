import Home from '@/modules/Home/Index.vue';
import { FirebaseMock, FilestoreMock } from '@/services/__tests__';
import HomeProps from '@/modules/Home/types/HomeProps';
import factory from './__factory';

const firebaseMock = new FirebaseMock();
const filestoreMock = new FilestoreMock();

const createComponent = () => {
  const component = factory(Home, firebaseMock, filestoreMock);
  return component;
};

describe('modules/Home/Index.vue', () => {
  it('Check Vue component is created', async () => {
    const wrap = createComponent();
    /* eslint-disable  @typescript-eslint/no-explicit-any */
    const vm = (wrap.vm as any) as HomeProps;
    const { ds } = vm;
    await (wrap.vm as any).$nextTick();

    expect(wrap.vm).toBeInstanceOf(Object);
    expect(ds?.getIsAuthorized).toBeFalsy();
    expect(vm.userName).toBe('');
  });
  it('Check VueStore NavigationStore exist', async () => {
    const wrap = createComponent();
    /* eslint-disable  @typescript-eslint/no-explicit-any */
    const vm = (wrap.vm as any) as HomeProps;
    const { ds } = vm;
    expect(ds).toBeInstanceOf(Object);
  });
  it('Check VueStore FilestoreStore exist', async () => {
    const wrap = createComponent();
    /* eslint-disable  @typescript-eslint/no-explicit-any */
    const vm = (wrap.vm as any) as HomeProps;
    const { fbs } = vm;
    expect(fbs).toBeInstanceOf(Object);
  });
});
