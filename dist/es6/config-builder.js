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
    this.kendoButton()
      .kendoTabStrip()
      .kendoProgressBar()
      .kendoSlider()
      .kendoColorPicker()
      .kendoDropDownList();
    return this;
  }

  /**
  * Globally register all Kendo Core and Kendo Pro wrappers
  */
  pro(): KendoConfigBuilder {
    this.core()
      .kendoGrid()
			.kendoAutoComplete()
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
}
