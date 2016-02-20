import {customElement, bindable, inject} from 'aurelia-framework';
import {WidgetBase} from '../common/widget-base';
import {generateBindables} from '../common/decorators';
import 'kendo-ui/js/kendo.dataviz.chart.min';

@customElement('k-chart')
@generateBindables('kendoChart')
@inject(Element)
export class Chart extends WidgetBase {

  @bindable kDataSource;
  @bindable options = {};

  constructor(element) {
    super('kendoChart', element);
  }

  attached() {
    this._initialize();
  }

  getAxis(name) {
    if (this.widget) {
      return this.widget.getAxis(name);
    }
  }

  redraw() {
    if (this.widget) {
      return this.widget.redraw();
    }
  }

  refresh() {
    if (this.widget) {
      return this.widget.refresh();
    }
  }

  resize() {
    if (this.widget) {
      return this.widget.resize();
    }
  }

  setDataSource(dataSource) {
    if (this.widget) {
      return this.widget.setDataSource(dataSource);
    }
  }

  setOptions(value) {
    if (this.widget) {
      return this.widget.setOptions(value);
    }
  }

  imageDataURL() {
    if (this.widget) {
      return this.widget.imageDataURL();
    }
  }

  toggleHighlight(show, options) {
    if (this.widget) {
      return this.widget.toggleHighlight(show, options);
    }
  }

  destroy() {
    if (this.widget) {
      return this.widget.destroy();
    }
  }
}
