{
	// The unique name of the event
	name: "myapp/user.signup"
	// The event payload, containing all event data
	data: {
		billing_plan: string
	}
	user: {
		external_id:  string
		emai:         string
		account_name: string
	}
	// An optional event version
	v?: string

	// The epoch of the event, in milliseconds
	ts?: number
}
