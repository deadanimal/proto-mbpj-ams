import { Routes } from "@angular/router";

import { AccRentComponent } from './acc-rent/acc-rent.component';
import { PayRentComponent } from './pay-rent/pay-rent.component';

export const RentRoutes: Routes = [
    {
        path: "",
        children: [
          {
            path: "acc-rent",
            component: AccRentComponent
          }
        ]
      },
      {
        path: "",
        children: [
          {
            path: "pay-rent",
            component: PayRentComponent
          }
        ]
      }
];