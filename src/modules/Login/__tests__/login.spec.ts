import Login from '@/modules/Login/Index.vue';
import FirebaseMock from '@/services/__tests__/firebase.mock';
import LoginProps from '@/modules/Login/types/LoginProps';
import { UserAuthenticate } from '@/types/UserAuthenticate';
import factory from './__factory';

const firebaseMock = new FirebaseMock();

const createComponent = () => {
  const component = factory(Login, firebaseMock);
  return component;
};

describe('modules/Login/Index.vue', () => {
  it('Check is not authorized on start', async () => {
    const wrap = createComponent();
    /* eslint-disable  @typescript-eslint/no-explicit-any */
    const vm = (wrap.vm as any) as LoginProps;
    const { ds } = vm;
    await (wrap.vm as any).$nextTick();

    expect(wrap.vm).toBeInstanceOf(Object);
    expect(ds?.getIsAuthorized).toBeFalsy();
  });
  it('Check is authorized after login from services', async () => {
    const userName = 'Test 123';
    const wrap = createComponent();
    const vm = (wrap.vm as any) as LoginProps;
    const { ds } = vm;
    if (ds) {
      ds.userChange({ userName, userRoles: ['User'] });
    }
    await (wrap.vm as any).$nextTick();
    expect(ds?.getIsAuthorized).toBeTruthy();
    expect(vm.isAuthorized).toBeTruthy();
  });
  it('Check is authorized after login empty', async () => {
    const wrap = createComponent();
    const vm = (wrap.vm as any) as LoginProps;
    const { ds } = vm;
    await vm.login();
    await (wrap.vm as any).$nextTick();
    expect(ds?.getIsAuthorized).toBeFalsy();
    expect(vm.isAuthorized).toBeFalsy();
  });
  it('Check is authorized after login email without @', async () => {
    const wrap = createComponent();
    const vm = (wrap.vm as any) as LoginProps;
    const { ds } = vm;
    ds?.init();
    vm.model.email = '12345';
    await vm.login();
    await (wrap.vm as any).$nextTick();
    expect(ds?.getIsAuthorized).toBeFalsy();
    expect(vm.isAuthorized).toBeFalsy();
  });
  it('Check is authorized after login correct email no password', async () => {
    const wrap = createComponent();
    const vm = (wrap.vm as any) as LoginProps;
    const { ds } = vm;
    vm.model.email = 'abc@ab.pl';
    await vm.login();
    await (wrap.vm as any).$nextTick();
    expect(ds?.getIsAuthorized).toBeFalsy();
    expect(vm.isAuthorized).toBeFalsy();
  });
  it('Check is authorized after login correct email and password', async () => {
    const wrap = createComponent();
    await (wrap.vm as any).$nextTick();
    const vm = (wrap.vm as any) as LoginProps;
    const { ds } = vm;
    vm.model.email = 'abc@ab.pl';
    vm.model.password = '123456';
    firebaseMock.callback = {
      userChange: async (user: UserAuthenticate) => {
        await ds?.userChange(user);
      },
    };
    await vm.login();
    await (wrap.vm as any).$nextTick();
    expect(ds?.getIsAuthorized).toBeTruthy();
    expect(vm.isAuthorized).toBeTruthy();
  });
});
