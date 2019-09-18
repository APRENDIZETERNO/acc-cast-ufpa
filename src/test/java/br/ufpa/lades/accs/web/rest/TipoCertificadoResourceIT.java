package br.ufpa.lades.accs.web.rest;

import br.ufpa.lades.accs.TurmasAccApp;
import br.ufpa.lades.accs.domain.TipoCertificado;
import br.ufpa.lades.accs.repository.TipoCertificadoRepository;
import br.ufpa.lades.accs.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.List;

import static br.ufpa.lades.accs.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link TipoCertificadoResource} REST controller.
 */
@SpringBootTest(classes = TurmasAccApp.class)
public class TipoCertificadoResourceIT {

    private static final String DEFAULT_NOME = "AAAAAAAAAA";
    private static final String UPDATED_NOME = "BBBBBBBBBB";

    @Autowired
    private TipoCertificadoRepository tipoCertificadoRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restTipoCertificadoMockMvc;

    private TipoCertificado tipoCertificado;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TipoCertificadoResource tipoCertificadoResource = new TipoCertificadoResource(tipoCertificadoRepository);
        this.restTipoCertificadoMockMvc = MockMvcBuilders.standaloneSetup(tipoCertificadoResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TipoCertificado createEntity(EntityManager em) {
        TipoCertificado tipoCertificado = new TipoCertificado()
            .nome(DEFAULT_NOME);
        return tipoCertificado;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TipoCertificado createUpdatedEntity(EntityManager em) {
        TipoCertificado tipoCertificado = new TipoCertificado()
            .nome(UPDATED_NOME);
        return tipoCertificado;
    }

    @BeforeEach
    public void initTest() {
        tipoCertificado = createEntity(em);
    }

    @Test
    @Transactional
    public void createTipoCertificado() throws Exception {
        int databaseSizeBeforeCreate = tipoCertificadoRepository.findAll().size();

        // Create the TipoCertificado
        restTipoCertificadoMockMvc.perform(post("/api/tipo-certificados")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tipoCertificado)))
            .andExpect(status().isCreated());

        // Validate the TipoCertificado in the database
        List<TipoCertificado> tipoCertificadoList = tipoCertificadoRepository.findAll();
        assertThat(tipoCertificadoList).hasSize(databaseSizeBeforeCreate + 1);
        TipoCertificado testTipoCertificado = tipoCertificadoList.get(tipoCertificadoList.size() - 1);
        assertThat(testTipoCertificado.getNome()).isEqualTo(DEFAULT_NOME);
    }

    @Test
    @Transactional
    public void createTipoCertificadoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = tipoCertificadoRepository.findAll().size();

        // Create the TipoCertificado with an existing ID
        tipoCertificado.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTipoCertificadoMockMvc.perform(post("/api/tipo-certificados")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tipoCertificado)))
            .andExpect(status().isBadRequest());

        // Validate the TipoCertificado in the database
        List<TipoCertificado> tipoCertificadoList = tipoCertificadoRepository.findAll();
        assertThat(tipoCertificadoList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllTipoCertificados() throws Exception {
        // Initialize the database
        tipoCertificadoRepository.saveAndFlush(tipoCertificado);

        // Get all the tipoCertificadoList
        restTipoCertificadoMockMvc.perform(get("/api/tipo-certificados?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(tipoCertificado.getId().intValue())))
            .andExpect(jsonPath("$.[*].nome").value(hasItem(DEFAULT_NOME.toString())));
    }
    
    @Test
    @Transactional
    public void getTipoCertificado() throws Exception {
        // Initialize the database
        tipoCertificadoRepository.saveAndFlush(tipoCertificado);

        // Get the tipoCertificado
        restTipoCertificadoMockMvc.perform(get("/api/tipo-certificados/{id}", tipoCertificado.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(tipoCertificado.getId().intValue()))
            .andExpect(jsonPath("$.nome").value(DEFAULT_NOME.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingTipoCertificado() throws Exception {
        // Get the tipoCertificado
        restTipoCertificadoMockMvc.perform(get("/api/tipo-certificados/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTipoCertificado() throws Exception {
        // Initialize the database
        tipoCertificadoRepository.saveAndFlush(tipoCertificado);

        int databaseSizeBeforeUpdate = tipoCertificadoRepository.findAll().size();

        // Update the tipoCertificado
        TipoCertificado updatedTipoCertificado = tipoCertificadoRepository.findById(tipoCertificado.getId()).get();
        // Disconnect from session so that the updates on updatedTipoCertificado are not directly saved in db
        em.detach(updatedTipoCertificado);
        updatedTipoCertificado
            .nome(UPDATED_NOME);

        restTipoCertificadoMockMvc.perform(put("/api/tipo-certificados")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTipoCertificado)))
            .andExpect(status().isOk());

        // Validate the TipoCertificado in the database
        List<TipoCertificado> tipoCertificadoList = tipoCertificadoRepository.findAll();
        assertThat(tipoCertificadoList).hasSize(databaseSizeBeforeUpdate);
        TipoCertificado testTipoCertificado = tipoCertificadoList.get(tipoCertificadoList.size() - 1);
        assertThat(testTipoCertificado.getNome()).isEqualTo(UPDATED_NOME);
    }

    @Test
    @Transactional
    public void updateNonExistingTipoCertificado() throws Exception {
        int databaseSizeBeforeUpdate = tipoCertificadoRepository.findAll().size();

        // Create the TipoCertificado

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTipoCertificadoMockMvc.perform(put("/api/tipo-certificados")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tipoCertificado)))
            .andExpect(status().isBadRequest());

        // Validate the TipoCertificado in the database
        List<TipoCertificado> tipoCertificadoList = tipoCertificadoRepository.findAll();
        assertThat(tipoCertificadoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteTipoCertificado() throws Exception {
        // Initialize the database
        tipoCertificadoRepository.saveAndFlush(tipoCertificado);

        int databaseSizeBeforeDelete = tipoCertificadoRepository.findAll().size();

        // Delete the tipoCertificado
        restTipoCertificadoMockMvc.perform(delete("/api/tipo-certificados/{id}", tipoCertificado.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<TipoCertificado> tipoCertificadoList = tipoCertificadoRepository.findAll();
        assertThat(tipoCertificadoList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TipoCertificado.class);
        TipoCertificado tipoCertificado1 = new TipoCertificado();
        tipoCertificado1.setId(1L);
        TipoCertificado tipoCertificado2 = new TipoCertificado();
        tipoCertificado2.setId(tipoCertificado1.getId());
        assertThat(tipoCertificado1).isEqualTo(tipoCertificado2);
        tipoCertificado2.setId(2L);
        assertThat(tipoCertificado1).isNotEqualTo(tipoCertificado2);
        tipoCertificado1.setId(null);
        assertThat(tipoCertificado1).isNotEqualTo(tipoCertificado2);
    }
}
