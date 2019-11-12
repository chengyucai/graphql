const { RESTDataSource } = require("apollo-datasource-rest");

class LaunchAPI extends RESTDataSource {
  constructor({ store }) {
    super();
    this.store = store;
    this.baseURL = "https://member.xinmedia.com";
  }

  async didReceiveResponse(response) {
    if (response.ok) {
      this.response = response;
      return this.parseBody(response);
    } else {
      throw await this.errorFromResponse(response);
    }
  }

  getname(key) {
    const body = this.response.headers.get("set-cookie");
    const regex = new RegExp(`.*(${key}=.*)`);
    return body.replace(regex, "$1").split(";")[0];
  }

  willSendRequest(request) {
    request.headers.set("x-xsrf-token", this.body ? this.body : "");
    request.headers.set("cookie", this.xsrf ? this.xsrf : "");
    request.headers.set("cookie", this.session ? this.session : "");
  }

  async saveToken(email) {
    const { body, xsrf, session } = await this.getKey();
    await this.store.tokens.create({
      username: email,
      body: body,
      xsrf: xsrf,
      session: session
    });
  }

  async getKey() {
    const response = await this.get("xsrf");
    return {
      body: response,
      xsrf: this.getname("XSRF-TOKEN"),
      session: this.getname("member_session")
    };
  }

  async getMenu() {
    const { body, xsrf, session } = await this.getKey();
    this.body = body;
    this.xsrf = xsrf;
    this.session = session;
    const response = await this.get("api/getmenu");
    return JSON.parse(response);
  }

  async Login({ email, pass }) {
    // this.store.tokens.sync({ force: true }).then(() => {
    // 现在数据库中的 `users` 表对应于模型定义
    //     return
    // });
    //
    // await this.store.tokens
    //   .findOne({ where: { username: email } })
    //   .then(async project => {
    //     const data = project ? project : await this.saveToken(email);

    //   });
    const { body, xsrf, session } = await this.getKey();
    this.body = body;
    this.xsrf = xsrf;
    this.session = session;

    const response = await this.post("api/login", {
      acc_account: email,
      acc_pw: pass
    });
    return JSON.parse(response);
  }
}

module.exports = LaunchAPI;
