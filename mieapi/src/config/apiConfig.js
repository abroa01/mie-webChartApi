export const BASE_URL = 'https://anshulmie.webchartnow.com/webchart.cgi/json';
export const USERNAME = 'abroa01';
export const PASSWORD = '$K@ter0707';
export const endpoints = {
    abbreviations : 'db/abbreviations',
    acceptable_ips : 'db/acceptable_ips',
    accommodations : 'db/accommodations',
    action_rule : 'db/action_rule',
    admin_code :'db/admin_code',
    appointment_cancel_codes: 'db/appointment_cancel_codes',
    apt_type_templates :'db/apt_type_templates',
    apt_types : 'db/apt_types',
    audio : 'db/audio',
    autocomplete_field: 'db/autocomplete_field',
    body_part_types : 'db/body_part_types',
    c_scriptlet_data : 'db/c_scriptlet_data',
    chart_display_order : 'db/chart_display_order',
    chart_type_link : 'db/chart_type_link',
    chartprintdefs : 'db/chartprintdefs',
    charts : 'db/charts',
    charttabs_restricted : 'db/charttabs_restricted',
    clinical_restriction_types : 'db/clinical_restriction_types',
    coding_link : 'db/coding_link',
    cron : 'db/cron',
    cron_ext_options: 'db/cron_ext_options',
    datasend_route: 'db/datasend_route',
    datasend_route_revisions: 'db/datasend_route_revisions',
    datebegin_esigning: 'db/datebegin_esigning',
    deps: 'db/deps',
    document_attachments: 'db/document_attachments',
    document_sign: 'db/document_sign',
    document_types: 'db/document_types',
    documents: 'db/documents',
    documents_link: 'db/documents_link',
    documents_read: 'db/documents_read',
    documents_txt: 'db/documents_txt',
    drug_alias: 'db/drug_alias',
    enc_vt_cpt_picklists: 'db/enc_vt_cpt_picklists',
    encounter_billing: 'db/encounter_billing',
    encounter_exams: 'db/encounter_exams',
    encounter_extended_values: 'db/encounter_extended_values',
    encounter_orders: 'db/encounter_orders',
    encounter_orders_revisions: 'db/encounter_orders_revisions',
    encounter_service_types: 'db/encounter_service_types',
    encounter_stages: 'db/encounter_stages',
    encounter_templates: 'db/encounter_templates',
    encounter_users: 'db/encounter_users',
    encounter_visit_types: 'db/encounter_visit_types',
    encounters: 'db/encounters',
    encounters_current: 'db/encounters_current',
    encounters_link: 'db/encounters_link',
    fee_schedule: 'db/fee_schedule',
    fee_schedule_name: 'db/fee_schedule_name',
    fee_schedule_new: 'db/fee_schedule_new',
    ifq_categories: 'db/ifq_categories',
    ifq_permissions: 'db/ifq_permissions',
    ifq_recipient: 'db/ifq_recipient',
    incident_bls: 'db/incident_bls',
    incident_bls_codes: 'db/incident_bls_codes',
    incident_bls_revision: 'db/incident_bls_revision',
    incident_casenum: 'db/incident_casenum',
    incident_extended_fields: 'db/incident_extended_fields',
    incident_extended_fields_revision: 'db/incident_extended_fields_revision',
    incident_links: 'db/incident_links',
    incident_nibp: 'db/incident_nibp',
    incident_nibp_revision: 'db/incident_nibp_revision',
    incident_users: 'db/incident_users',
    incidents: 'db/incidents',
    incidents_revision: 'db/incidents_revision',
    incoming_file_queue: 'db/incoming_file_queue',
    injection_codes_mask: 'db/injection_codes_mask',
    injections: 'db/injections',
    insurance_plans: 'db/insurance_plans',
    insurance_policy: 'db/insurance_policy',
    insurance_pre_cert: 'db/insurance_pre_cert',
    lab_requests: 'db/lab_requests',
    label_translate: 'db/label_translate',
    languages_supported: 'db/languages_supported',
    layout: 'db/layout',
    layout_document_types: 'db/layout_document_types',
    ledger: 'db/ledger',
    ledger_links: 'db/ledger_links',
    libraries: 'db/libraries',
    locations: 'db/locations',
    login_trusts: 'db/login_trusts',
    measure_enrollment: 'db/measure_enrollment',
    model: 'db/model',
    model_security: 'db/model_security',
    multi_type_sched: 'db/multi_type_sched',
    nature_of_injury_types: 'db/nature_of_injury_types',
    oauth_authorization_codes: 'db/oauth_authorization_codes',
    object_notes: 'db/object_notes',
    obs_forms: 'db/obs_forms',
    observation_codes: 'db/observation_codes',
    observation_codes_list: 'db/observation_codes_list',
    observation_flags: 'db/observation_flags',
    observation_ranges: 'db/observation_ranges',
    observations: 'db/observations',
    observations_snomed: 'db/observations_snomed',
    order_items: 'db/order_items',
    order_items_revisions: 'db/order_items_revisions',
    order_list: 'db/order_list',
    order_panels: 'db/order_panels',
    order_pick_list: 'db/order_pick_list',
    order_question_answers: 'db/order_question_answers',
    order_question_index: 'db/order_question_index',
    order_questions: 'db/order_questions',
    order_request_icd9cm: 'db/order_request_icd9cm',
    order_request_icd9cm_revisions: 'db/order_request_icd9cm_revisions',
    order_requests: 'db/order_requests',
    order_requests_revisions: 'db/order_requests_revisions',
    order_status_list: 'db/order_status_list',
    order_types: 'db/order_types',
    panel: 'db/panel',
    panel_action: 'db/panel_action',
    panel_action_enc_order: 'db/panel_action_enc_order',
    panel_action_related: 'db/panel_action_related',
    panel_chart: 'db/panel_chart',
    panel_membership: 'db/panel_membership',
    panel_membership_doc: 'db/panel_membership_doc',
    panel_membership_resp_chart: 'db/panel_membership_resp_chart',
    panel_regulation: 'db/panel_regulation',
    panel_restriction: 'db/panel_restriction',
    panel_trigger: 'db/panel_trigger',
    panel_work_region: 'db/panel_work_region',
    pat_chart_types: 'db/pat_chart_types',
    pat_pat_relations: 'db/pat_pat_relations',
    patient_clinical_restriction: 'db/patient_clinical_restriction',
    patient_conditions: 'db/patient_conditions',
    patient_conditions_family: 'db/patient_conditions_family',
    patient_panel_status: 'db/patient_panel_status',
    patient_partitions: 'db/patient_partitions',
    patient_partitions_restricted: 'db/patient_partitions_restricted',
    patient_procedures: 'db/patient_procedures',
    patient_respiratordetails: 'db/patient_respiratordetails',
    patient_targets: 'db/patient_targets',
    patients: 'db/patients',
    pft: 'db/pft',
    pft_maneuver: 'db/pft_maneuver',
    preferences: 'db/preferences',
    print_queue_multi: 'db/print_queue_multi',
    print_queue_multi_sequence: 'db/print_queue_multi_sequence',
    print_section_doctypes: 'db/print_section_doctypes',
    print_section_insurance_plans: 'db/print_section_insurance_plans',
    print_sections: 'db/print_sections',
    realms: 'db/realms',
    refer_to_systems: 'db/refer_to_systems',
    refer_to_systems_extended_index: 'db/refer_to_systems_extended_index',
    refer_to_systems_extended_values: 'db/refer_to_systems_extended_values',
    relation_types: 'db/relation_types',
    rx_allergy_custom: 'db/rx_allergy_custom',
    rx_commonsigs: 'db/rx_commonsigs',
    rx_nosub: 'db/rx_nosub',
    rxlist: 'db/rxlist',
    rxlist_allergy_reactions: 'db/rxlist_allergy_reactions',
    rxlist_allergylist: 'db/rxlist_allergylist',
    rxlist_commonscripts: 'db/rxlist_commonscripts',
    rxlist_drug_instructions: 'db/rxlist_drug_instructions',
    rxlist_frequencies: 'db/rxlist_frequencies',
    rxlist_indications: 'db/rxlist_indications',
    rxlist_instructions: 'db/rxlist_instructions',
    rxlist_kit: 'db/rxlist_kit',
    rxlist_kit_item: 'db/rxlist_kit_item',
    rxlist_refills: 'db/rxlist_refills',
    rxlist_term_replace: 'db/rxlist_term_replace',
    schedules: 'db/schedules',
    scripted_logic: 'db/scripted_logic',
    scripted_rule_items: 'db/scripted_rule_items',
    scripted_rule_lookup: 'db/scripted_rule_lookup',
    scripted_rules: 'db/scripted_rules',
    security_role_acl: 'db/security_role_acl',
    security_roles: 'db/security_roles',
    system_reports: 'db/system_reports',
    tabs: 'db/tabs',
    task_template: 'db/task_template',
    task_template_users: 'db/task_template_users',
    tasklist_events: 'db/tasklist_events',
    transactions: 'db/transactions',
    translate: 'db/translate',
    translate_map: 'db/translate_map',
    user_chart_tabs: 'db/user_chart_tabs',
    user_moveable_layout: 'db/user_moveable_layout',
    user_roles: 'db/user_roles',
    users: 'db/users',
    v_ledger: 'db/v_ledger',
    v_order_fee_schedule: 'db/v_order_fee_schedule',
    visit_types_restricted: 'db/visit_types_restricted',
    warnings_restricted: 'db/warnings_restricted',
}
