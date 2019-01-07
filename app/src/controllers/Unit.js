// Zero-padded string of length 20
const ZERO20 = '0'.repeat(20);

/**
 * This class encapsulates the data related to a single product unit.
 * Each unit has a set of checks to be performed (from its `product` type)
 * and a specific state (checked/unchecked) for each check.
 * Units also can have a text identifier, a description and
 * an error messsage if something is not working as expected.
 */
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
  component = null;

  /**
   * Creates a Unit object based on the provided data
   * @param {object} data 
   * @param {object} product 
   */
  static createUnit(data, product) {
    const unit = new Unit();
    Object.assign(unit, data);
    const numChecks = (product && product.checks && product.checks.length) || 1;
    unit.checks = `${unit.checks}${ZERO20}`.substr(0, Math.max(1, numChecks));
    unit.updateStatus();
    return unit;
  }

  /**
   * Updates the status of this unit based on the current data
   */
  updateStatus() {
    const k = this.checks.replace(/0/g, '').length;
    this.checksDone = k;
    this.unitStatus = (this.problemes && this.problemes.trim()) ? 3
      : k === 0 ? 0
        : k === this.checks.length ? 2
          : 1;
  }

  /**
   * Sets the state of a specific check, updating also the Unit status
   * @param {num} i 
   * @param {boolean} value 
   */
  setCheckValue(i, value) {
    const chk = this.checks.split('');
    chk[i] = value ? '1' : '0';
    this.checks = chk.join('');
    this.updateStatus();
  }

  /**
   * Updates the unit identifier, description or error text
   * @param {string} attr 
   * @param {string} value 
   */
  setAttribute(attr, value) {
    this[attr] = value;
    if (attr === 'problemes')
      this.updateStatus();
  }

  /**
   * Checks if this unit has a 'problem' label non-empty and not-null
   */
  hasProblems() {
    return this.problemes && this.problemes.trim() ? true : false;
  }

  /**
   * Gets the JSON representation of the current Unit state
   */
  getJSON() {
    const clone = Object.assign({}, this);
    delete clone.component;
    return JSON.stringify(clone);
  }

  /**
   * Updates the Unit state with new data
   * @param {object} data 
   */
  updateContent(data) {
    Object.assign(this, data);
    this.updateStatus();
    return this.component && this.component.current && this.component.current.updateContent();
  }

}

export default Unit;