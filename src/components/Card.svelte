<script lang="ts">
  import {createEventDispatcher} from 'svelte';

	export let title = '';
  export let titleClass = '';
  export let cardClass = '';

  const dispatch = createEventDispatcher()
</script>

<div {...$$restProps} class="relative" on:click={() => dispatch('click')}>
  {#if title}
    <h2 class={`absolute -top-3 left-5 font-bold z-10 drop-shadow-xl leading-[1] ${titleClass}`}>{title}</h2>
  {/if}
  <div class={`card bg-base-200 shadow-xl ${cardClass}`}>
  	<div class="card-body px-6 py-8">
  		<slot />
  	</div>
  </div>
</div>
