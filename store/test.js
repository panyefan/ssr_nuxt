export const state = () => ({
	testInfo: '测试store state', // 测试另外一个store
});

export const mutations = {
	UPDATE_TESTINFO(state, payload) {
		state.testInfo = payload;
	},
};
