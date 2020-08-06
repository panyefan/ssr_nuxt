import cookieparser from 'cookieparser';

export const state = () => ({
	token: '', // 登录用户信息
});

export const mutations = {
	UPDATE_TOKEN(state, payload) {
		state.token = payload;
	},
};

export const actions = {
	// nuxtServerInit Nuxt提供的方法，在页面刷新的时候，在到达页面之前。给你去处理state数据方法。
    // 登录接口，已经把登录的token存放在Cookie里面，然后在nuxtServerInit 方法里面去获取Cookie里面的数据赋值到state
    nuxtServerInit({ commit }, { req }) {
        let token = '';
        if (req.headers.cookie) {
            const parsed = cookieparser.parse(req.headers.cookie);
            try {
                token = parsed.token;
            } catch (err) {
                // console.log("找不到有效的Cookie");
            }
        }
        // 将保存在cookie的token保存到store
        commit('UPDATE_TOKEN', token);
    }
};