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

/* eslint-disable no-unused-expressions */
const sinon = require('sinon');
const chai = require('chai');
const sinonChai = require('sinon-chai');

chai.use(sinonChai);
const { expect } = chai;

const JDLApplicationConfiguration = require('../../../lib/core/jdl_application_configuration');
const StringJDLApplicationConfigurationOption = require('../../../lib/core/string_jdl_application_configuration_option');
const IntegerJDLApplicationConfigurationOption = require('../../../lib/core/integer_jdl_application_configuration_option');
const BooleanJDLApplicationConfigurationOption = require('../../../lib/core/boolean_jdl_application_configuration_option');
const ListJDLApplicationConfigurationOption = require('../../../lib/core/list_jdl_application_configuration_option');
const { OptionNames } = require('../../../lib/core/jhipster/application_options');
const logger = require('../../../lib/utils/objects/logger');

const { createApplicationConfigurationFromObject } = require('../../../lib/core/jdl_application_configuration_factory');

describe('JDLApplicationConfigurationFactory', () => {
  describe('createApplicationConfigurationFromObject', () => {
    context('when passing no configuration', () => {
      let createdConfiguration;
      let expectedConfiguration;

      before(() => {
        createdConfiguration = createApplicationConfigurationFromObject();
        expectedConfiguration = new JDLApplicationConfiguration();
      });

      it('should a configuration without option', () => {
        expect(createdConfiguration).to.deep.equal(expectedConfiguration);
      });
    });
    context('when passing a configuration', () => {
      context('containing a string option', () => {
        let createdConfiguration;
        let expectedConfiguration;

        before(() => {
          createdConfiguration = createApplicationConfigurationFromObject({
            [OptionNames.BASE_NAME]: 'application'
          });
          expectedConfiguration = new JDLApplicationConfiguration();
          expectedConfiguration.setOption(
            new StringJDLApplicationConfigurationOption(OptionNames.BASE_NAME, 'application')
          );
        });

        it('should create it', () => {
          expect(createdConfiguration).to.deep.equal(expectedConfiguration);
        });
      });
      context('containing a integer option', () => {
        let createdConfiguration;
        let expectedConfiguration;

        before(() => {
          createdConfiguration = createApplicationConfigurationFromObject({
            [OptionNames.SERVER_PORT]: 8042
          });
          expectedConfiguration = new JDLApplicationConfiguration();
          expectedConfiguration.setOption(new IntegerJDLApplicationConfigurationOption(OptionNames.SERVER_PORT, 8042));
        });

        it('should create it', () => {
          expect(createdConfiguration).to.deep.equal(expectedConfiguration);
        });
      });
      context('containing a boolean option', () => {
        let createdConfiguration;
        let expectedConfiguration;

        before(() => {
          createdConfiguration = createApplicationConfigurationFromObject({
            [OptionNames.ENABLE_TRANSLATION]: true
          });
          expectedConfiguration = new JDLApplicationConfiguration();
          expectedConfiguration.setOption(
            new BooleanJDLApplicationConfigurationOption(OptionNames.ENABLE_TRANSLATION, true)
          );
        });

        it('should create it', () => {
          expect(createdConfiguration).to.deep.equal(expectedConfiguration);
        });
      });
      context('containing a list-based option', () => {
        let createdConfiguration;
        let expectedConfiguration;

        before(() => {
          createdConfiguration = createApplicationConfigurationFromObject({
            [OptionNames.TEST_FRAMEWORKS]: []
          });
          expectedConfiguration = new JDLApplicationConfiguration();
          expectedConfiguration.setOption(new ListJDLApplicationConfigurationOption(OptionNames.TEST_FRAMEWORKS, []));
        });

        it('should create it', () => {
          expect(createdConfiguration).to.deep.equal(expectedConfiguration);
        });
      });
      context('containing an unknown configuration', () => {
        context('without options', () => {
          let loggerDebug;
          let config;
          before(() => {
            loggerDebug = sinon.spy(logger, 'debug');
            config = createApplicationConfigurationFromObject({ toto: 42 });
          });
          after(() => {
            loggerDebug.restore();
          });
          it('should send a debug message', () => {
            expect(loggerDebug).to.have.been.calledOnce;
            expect(loggerDebug.getCall(0).args[0]).to.equal(
              'Unrecognized application option name and value: toto and 42'
            );
          });
          it('should not add the generic field', () => {
            expect(config.options.toto).to.be.an('undefined');
          });
        });

        context('with exportGenericConfigs option', () => {
          let config;
          before(() => {
            config = createApplicationConfigurationFromObject({ toto: 42 }, { exportGenericConfigs: true });
          });
          it('it should add the generic field', () => {
            expect(config.options.toto).to.be.an('object');
            expect(config.options.toto.name).to.equal('toto');
          });
        });
      });
    });
  });
});
