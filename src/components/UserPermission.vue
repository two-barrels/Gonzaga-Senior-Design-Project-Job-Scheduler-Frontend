<template>
    <h2>{{ userName }}'s Role: </h2>
    <h3>Current Access to buildings/floors:</h3>
    <p>Select dropdown on buildings to view {{ userName }}'s access</p>

    <div class="row">
    <div class="col-4">
        <div class="list-group" id="list-tab" role="tablist">
        <a class="list-group-item list-group-item-action active" id="list-home-list" data-bs-toggle="list" href="#list-1" role="tab" aria-controls="list-home">Building 1</a>
        <a class="list-group-item list-group-item-action" id="list-profile-list" data-bs-toggle="list" href="#list-2" role="tab" aria-controls="list-profile">Building 2</a>
        <a class="list-group-item list-group-item-action" id="list-messages-list" data-bs-toggle="list" href="#list-messages" role="tab" aria-controls="list-messages">Building 3</a>
        <a class="list-group-item list-group-item-action" id="list-settings-list" data-bs-toggle="list" href="#list-settings" role="tab" aria-controls="list-settings">Building 4</a>
        </div>
  </div>
  <div class="col-8">
    <div class="tab-content" id="nav-tabContent">
      <div class="tab-pane fade show active" id="list-1" role="tabpanel" aria-labelledby="list-home-list">...</div>
      <div class="tab-pane fade" id="list-2" role="tabpanel" aria-labelledby="list-profile-list">...</div>
      <div class="tab-pane fade" id="list-messages" role="tabpanel" aria-labelledby="list-messages-list">...</div>
      <div class="tab-pane fade" id="list-settings" role="tabpanel" aria-labelledby="list-settings-list">...</div>
    </div>
  </div>
</div>
</template>
<script>
    export default {
    name: 'user-permission',
    components: {

    },
    props: {
        userName: String
    },
    }
    </script>
    
    <style lang="scss" scoped>

    </style>
      