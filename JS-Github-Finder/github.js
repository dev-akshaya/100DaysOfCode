class Github {
  constructor() {
    this.clint_id = '04034d0db339596a87df';
    this.clint_secret = 'e2b7eb6967ed053e27a0aef323bc5cb6f074ab6e';
  }

  async getUser(user){
    const profileResponse = await fetch(`https://api.github.com/users/${user}?clint_id=${this.clint_id}&clint_secret=${this.clint_secret}`);

    const profile = await profileResponse.json();

    return {
      profile
    }
  }
}