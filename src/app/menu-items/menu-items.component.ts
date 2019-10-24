import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';


@Component({
  selector: 'app-menu-items',
  templateUrl: './menu-items.component.html',
  styleUrls: ['./menu-items.component.less']
})
export class MenuItemsComponent implements OnInit {
  private response = [];
  private contextObject = {
    menupreference:null,
    maincourse:null,
    accompaniment:null
  };
  private setOfRules = [{id:'101', value: ['201', '202', '206', '302']},
  {id:'102', value: ['201', '301']},
  {id:'103', value: ['202']},
  {id:'204', value: ['304']},
  {id:'205', value: ['304']}];
  constructor() {
    this.response = [
      // first group of radio-buttons
      [
        { id: '101', value: 'Vegetarian' },
        { id: '102', value: 'Nut allergy' },
        { id: '103', value: 'Halal' }
      ],
      // second group of radio-buttons
      [
        { id: '201', value: 'Cashew chicken' },
        { id: '202', value: 'Sweet and sour pork' },
        { id: '203', value: 'Stir fried Tofu' },
        { id: '204', value: 'Vegetable fried rice' },
        { id: '205', value: 'Pad Thai' },
        { id: '206', value: 'Massaman beef' },
      ],
      // third group of radio-buttons
      [
        { id: '301', value: 'Peanut sauce' },
        { id: '302', value: 'Oyster sauce' },
        { id: '303', value: 'Vegetable spring rolls' },
        { id: '304', value: 'Steamed rice' },
      ],
    ];
    this.resetMenuType();
    this.resetMainCourseAccompaniments();
  }
  resetMenuType() {
    _.each(_.take(this.response, 1), function(response) {
      _.each(response, function(resp) {
        resp.disabled = false;
        resp.checked = false;
      });
    });
  }
  resetMainCourseAccompaniments() {
    _.each(_.takeRight(this.response, 2), function(response) {
      _.each(response, function(resp) {
        resp.disabled = true;
        resp.checked = false;
      });
    });
    
  }
  resetAccompaniments() {
    _.each(_.takeRight(this.response, 1), function(response) {
      _.each(response, function(resp) {
        resp.disabled = true;
        resp.checked = false;
      });
    });
    
  }
  ngOnInit() {

  }
  onChangeMenuType(item:any) {
    this.resetMenuType();
    this.resetMainCourseAccompaniments();
    item.checked = true;
    this.contextObject.menupreference = item;
    this.enableMainCourse(item);

  }
  enableMainCourse(menuType:any) {
    var rulesArray = _.get(_.find(this.setOfRules, {'id':menuType.id}), 'value');
    /**
     * Get the mainCourse array
     */
    _.each(this.response[1], function(mainCourse) {
        if(_.includes(rulesArray, mainCourse.id)) {
          mainCourse.disabled = true;
        }else {
          mainCourse.disabled = false;
        }
    });
  }
  onChangeMainCourse(item:any) {
    this.resetAccompaniments();
    this.contextObject.maincourse = item;
    this.enableAccompaniments(item);
  }
  enableAccompaniments(mainCourse:any) {
    this.enableRadio(mainCourse);
    this.enableRadio(this.contextObject.menupreference);
  }
  enableRadio(ruleObj:any) {
    /**
     * Run the set of rules one each
     * for menuType and mainCourse 
     * to enable/disable accompaniments
     */
    var rulesArray = _.get(_.find(this.setOfRules, {'id':ruleObj.id}), 'value');
    /**
     * Get the accompaniment array
     */
    _.each(this.response[2], function(accompaniment) {
        if(_.includes(rulesArray, accompaniment.id)) {
          accompaniment.disabled = true;
        }else {
          accompaniment.disabled = false;
        }
    });
  }
}
