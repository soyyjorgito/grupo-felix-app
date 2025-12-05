export type RecordStatus = "approved" | "pending_review" | "rejected" | "corrected"

export interface FloorControlRecord {
  id: string
  client: {
    advisor: string
    date: string
    first_name: string
    last_name: string
    city: string
    state: string
    address: string
    zip: string
    phone_primary: string
    phone_secondary: string
    email: string
    first_time: "yes" | "no" | ""
  }
  visit: {
    with_appointment: string[]
    without_appointment: string[]
    other_with_appointment: string
    other_without_appointment: string
  }
  vehicle_interest: {
    vehicle: string
    year: string
    version: string
    color: string
    accessories: string
    second_option: string
    test_drive: "yes" | "no" | ""
  }
  current_vehicle: {
    brand: string
    model: string
    year: string
    trade_in: "yes" | "no" | ""
  }
  financing: {
    type: "cash" | "credit" | "leasing" | ""
    f_and_i: "yes" | "no" | ""
  }
  pva: string[]
  notes: string
  signatures: {
    advisor: string
    sales_manager: string
  }
  status: RecordStatus
  rejection_comment?: string
  created_at: string
  updated_at: string
}

export const initialFormState: Omit<FloorControlRecord, "id" | "created_at" | "updated_at"> = {
  client: {
    advisor: "",
    date: new Date().toISOString().split("T")[0],
    first_name: "",
    last_name: "",
    city: "",
    state: "",
    address: "",
    zip: "",
    phone_primary: "",
    phone_secondary: "",
    email: "",
    first_time: "",
  },
  visit: {
    with_appointment: [],
    without_appointment: [],
    other_with_appointment: "",
    other_without_appointment: "",
  },
  vehicle_interest: {
    vehicle: "",
    year: "",
    version: "",
    color: "",
    accessories: "",
    second_option: "",
    test_drive: "",
  },
  current_vehicle: {
    brand: "",
    model: "",
    year: "",
    trade_in: "",
  },
  financing: {
    type: "",
    f_and_i: "",
  },
  pva: [],
  notes: "",
  signatures: {
    advisor: "",
    sales_manager: "",
  },
  status: "pending_review",
}
