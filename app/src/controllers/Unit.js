
const ZERO20 = '0'.repeat(20);

class Unit {
  comanda = null;
  producte = null;
  num = '000';
  id = '';
  descripcio = '';
  problemes = '';
  checks = '0';
  checksDone = 0;
  // 0: None checked, 1: Some checked, 2: All checked, 3: With error
  unitStatus = 0;
  client = 0;
  component = null;

  static createUnit(data, product, client) {
    const unit = new Unit();
    Object.assign(unit, data);
    unit.client = client;
    const numChecks = (product && product.checks && product.checks.length) || 1;
    unit.checks = `${unit.checks}${ZERO20}`.substr(0, Math.max(1, numChecks));
    unit.updateStatus();
    return unit;
  }

  updateStatus() {
    const k = this.checks.replace(/0/g, '').length;
    this.checksDone = k;
    this.unitStatus = (this.problemes && this.problemes.trim()) ? 3
      : k === 0 ? 0
        : k === this.checks.length ? 2
          : 1;
  }

  setCheckValue(i, value) {
    const chk = this.checks.split('');
    chk[i] = value ? '1' : '0';
    this.checks = chk.join('');
    this.updateStatus();
  }

  setAttribute(attr, value) {
    this[attr] = value;
    if (attr === 'problemes')
      this.updateStatus();
  }

  hasProblems() {
    return this.problemes && this.problemes.trim() ? true : false;
  }

  getJSON() {
    const clone = Object.assign({}, this);
    delete clone.component;
    return JSON.stringify(clone);
  }

  updateContent(data) {
    Object.assign(this, data);
    this.updateStatus();
    return this.component && this.component.current && this.component.current.updateContent();
  }

}

export default Unit;