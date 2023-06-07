<script lang="ts">
	export let title = '';
  export let titleClass = '';
  export let cardClass = '';
</script>

<div {...$$restProps}>
  {#if title}
    <h2 class={`-mb-4 ml-5 font-bold relative z-10 drop-shadow-xl ${titleClass}`}>{title}</h2>
  {/if}
  <div class={`card bg-base-200 shadow-xl ${cardClass}`}>
  	<div class="card-body">
  		<slot />
  	</div>
  </div>
</div>
