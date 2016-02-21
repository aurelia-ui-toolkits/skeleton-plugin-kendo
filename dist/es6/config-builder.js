/**
* Configure the Aurelia-KendoUI-plugin
*/
export class KendoConfigBuilder {

	resources: string[] = [];
  useGlobalResources: boolean = true;

  /**
  * Globally register all Kendo Core wrappers
  */
  core(): KendoConfigBuilder {
    this.kendoAutoComplete()
      .kendoButton()
      .kendoTemplateSupport()
      .kendoTabStrip();
    return this;
  }

  /**
  * Globally register all Kendo Core and Kendo Pro wrappers
  */
  pro(): KendoConfigBuilder {
    this.core()
      .kendoGrid()
      .kendoChart();
    return this;
  }

  /**
  * Don't globalize any resources
  * Allows you to import wrappers yourself via <require></require>
  */
  withoutGlobalResources(): KendoConfigBuilder {
    this.useGlobalResources = false;
    return this;
  }

    /**
  * Registers value converters (wrappers around kendo functions)
  */
  useValueConverters(): KendoConfigBuilder {
    this.resources.push('valueconverters/valueconverters');
    return this;
  }

  /**
  * Adds kendo templating support
  */
  kendoTemplateSupport(): KendoConfigBuilder {
    this.resources.push('common/k-template');
    return this;
  }

  kendoAutoComplete(): KendoConfigBuilder {
    this.resources.push('autocomplete/autocomplete');
    return this;
  }

  kendoButton(): KendoConfigBuilder {
    this.resources.push('button/button');
    return this;
  }

  kendoGrid(): KendoConfigBuilder {
    this.resources.push('grid/grid');
    this.resources.push('grid/k-col');
    return this;
  }

  kendoChart(): KendoConfigBuilder {
    this.resources.push('chart/chart');
    return this;
  }

  kendoTabStrip(): KendoConfigBuilder {
    this.resources.push('tabstrip/tabstrip');
    return this;
  }
}
