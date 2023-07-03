import { NgModule } from '@angular/core';

import { BootstrapIconsModule } from 'ng-bootstrap-icons';
import { Cart, CartPlus, Dash, Plus, Trash } from 'ng-bootstrap-icons/icons';

const icons = {
  Cart,
  CartPlus,
  Dash,
  Plus,
  Trash,
};

@NgModule({
  imports: [BootstrapIconsModule.pick(icons)],
  exports: [BootstrapIconsModule],
})
export class IconsModule {}
