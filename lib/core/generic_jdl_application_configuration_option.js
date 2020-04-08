/**
 * Copyright 2013-2020 the original author or authors from the JHipster project.
 *
 * This file is part of the JHipster project, see http://www.jhipster.tech/
 * for more information.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const JDLApplicationConfigurationOption = require('./jdl_application_configuration_option');

module.exports = class GenericJDLApplicationConfigurationOption extends JDLApplicationConfigurationOption {
  constructor(name, value) {
    super(name, Array.isArray(value) ? new Set(value) : value);
  }

  isSet() {
    return this.value instanceof Set;
  }

  getValue() {
    if (this.isSet()) {
      return Array.from(this.value);
    }
    return this.value;
  }

  toString() {
    if (this.isSet()) {
      return this._toString(`[${this.getValue().join(', ')}]`);
    }
    const value = `${this.value}`;
    // Test if must be quoted (characters that fails parsing)
    if (/[$.]/.test(value)) {
      return this._toString(`"${this.value}"`);
    }
    return super._toString(value);
  }
};
