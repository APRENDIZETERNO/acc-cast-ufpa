package br.ufpa.lades.accs.web.rest;

import br.ufpa.lades.accs.TurmasAccApp;
import br.ufpa.lades.accs.domain.TurmaACC;
import br.ufpa.lades.accs.repository.TurmaACCRepository;
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
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import static br.ufpa.lades.accs.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link TurmaACCResource} REST controller.
 */
@SpringBootTest(classes = TurmasAccApp.class)
public class TurmaACCResourceIT {

    private static final String DEFAULT_NOME = "AAAAAAAAAA";
    private static final String UPDATED_NOME = "BBBBBBBBBB";

    private static final Integer DEFAULT_PONTUACAO = 1;
    private static final Integer UPDATED_PONTUACAO = 2;
    private static final Integer SMALLER_PONTUACAO = 1 - 1;

    private static final LocalDate DEFAULT_INICIO = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_INICIO = LocalDate.now(ZoneId.systemDefault());
    private static final LocalDate SMALLER_INICIO = LocalDate.ofEpochDay(-1L);

    private static final LocalDate DEFAULT_PRAZO_ENVIO = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_PRAZO_ENVIO = LocalDate.now(ZoneId.systemDefault());
    private static final LocalDate SMALLER_PRAZO_ENVIO = LocalDate.ofEpochDay(-1L);

    @Autowired
    private TurmaACCRepository turmaACCRepository;

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

    private MockMvc restTurmaACCMockMvc;

    private TurmaACC turmaACC;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TurmaACCResource turmaACCResource = new TurmaACCResource(turmaACCRepository);
        this.restTurmaACCMockMvc = MockMvcBuilders.standaloneSetup(turmaACCResource)
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
    public static TurmaACC createEntity(EntityManager em) {
        TurmaACC turmaACC = new TurmaACC()
            .nome(DEFAULT_NOME)
            .pontuacao(DEFAULT_PONTUACAO)
            .inicio(DEFAULT_INICIO)
            .prazoEnvio(DEFAULT_PRAZO_ENVIO);
        return turmaACC;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TurmaACC createUpdatedEntity(EntityManager em) {
        TurmaACC turmaACC = new TurmaACC()
            .nome(UPDATED_NOME)
            .pontuacao(UPDATED_PONTUACAO)
            .inicio(UPDATED_INICIO)
            .prazoEnvio(UPDATED_PRAZO_ENVIO);
        return turmaACC;
    }

    @BeforeEach
    public void initTest() {
        turmaACC = createEntity(em);
    }

    @Test
    @Transactional
    public void createTurmaACC() throws Exception {
        int databaseSizeBeforeCreate = turmaACCRepository.findAll().size();

        // Create the TurmaACC
        restTurmaACCMockMvc.perform(post("/api/turma-accs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(turmaACC)))
            .andExpect(status().isCreated());

        // Validate the TurmaACC in the database
        List<TurmaACC> turmaACCList = turmaACCRepository.findAll();
        assertThat(turmaACCList).hasSize(databaseSizeBeforeCreate + 1);
        TurmaACC testTurmaACC = turmaACCList.get(turmaACCList.size() - 1);
        assertThat(testTurmaACC.getNome()).isEqualTo(DEFAULT_NOME);
        assertThat(testTurmaACC.getPontuacao()).isEqualTo(DEFAULT_PONTUACAO);
        assertThat(testTurmaACC.getInicio()).isEqualTo(DEFAULT_INICIO);
        assertThat(testTurmaACC.getPrazoEnvio()).isEqualTo(DEFAULT_PRAZO_ENVIO);
    }

    @Test
    @Transactional
    public void createTurmaACCWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = turmaACCRepository.findAll().size();

        // Create the TurmaACC with an existing ID
        turmaACC.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTurmaACCMockMvc.perform(post("/api/turma-accs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(turmaACC)))
            .andExpect(status().isBadRequest());

        // Validate the TurmaACC in the database
        List<TurmaACC> turmaACCList = turmaACCRepository.findAll();
        assertThat(turmaACCList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllTurmaACCS() throws Exception {
        // Initialize the database
        turmaACCRepository.saveAndFlush(turmaACC);

        // Get all the turmaACCList
        restTurmaACCMockMvc.perform(get("/api/turma-accs?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(turmaACC.getId().intValue())))
            .andExpect(jsonPath("$.[*].nome").value(hasItem(DEFAULT_NOME.toString())))
            .andExpect(jsonPath("$.[*].pontuacao").value(hasItem(DEFAULT_PONTUACAO)))
            .andExpect(jsonPath("$.[*].inicio").value(hasItem(DEFAULT_INICIO.toString())))
            .andExpect(jsonPath("$.[*].prazoEnvio").value(hasItem(DEFAULT_PRAZO_ENVIO.toString())));
    }
    
    @Test
    @Transactional
    public void getTurmaACC() throws Exception {
        // Initialize the database
        turmaACCRepository.saveAndFlush(turmaACC);

        // Get the turmaACC
        restTurmaACCMockMvc.perform(get("/api/turma-accs/{id}", turmaACC.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(turmaACC.getId().intValue()))
            .andExpect(jsonPath("$.nome").value(DEFAULT_NOME.toString()))
            .andExpect(jsonPath("$.pontuacao").value(DEFAULT_PONTUACAO))
            .andExpect(jsonPath("$.inicio").value(DEFAULT_INICIO.toString()))
            .andExpect(jsonPath("$.prazoEnvio").value(DEFAULT_PRAZO_ENVIO.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingTurmaACC() throws Exception {
        // Get the turmaACC
        restTurmaACCMockMvc.perform(get("/api/turma-accs/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTurmaACC() throws Exception {
        // Initialize the database
        turmaACCRepository.saveAndFlush(turmaACC);

        int databaseSizeBeforeUpdate = turmaACCRepository.findAll().size();

        // Update the turmaACC
        TurmaACC updatedTurmaACC = turmaACCRepository.findById(turmaACC.getId()).get();
        // Disconnect from session so that the updates on updatedTurmaACC are not directly saved in db
        em.detach(updatedTurmaACC);
        updatedTurmaACC
            .nome(UPDATED_NOME)
            .pontuacao(UPDATED_PONTUACAO)
            .inicio(UPDATED_INICIO)
            .prazoEnvio(UPDATED_PRAZO_ENVIO);

        restTurmaACCMockMvc.perform(put("/api/turma-accs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTurmaACC)))
            .andExpect(status().isOk());

        // Validate the TurmaACC in the database
        List<TurmaACC> turmaACCList = turmaACCRepository.findAll();
        assertThat(turmaACCList).hasSize(databaseSizeBeforeUpdate);
        TurmaACC testTurmaACC = turmaACCList.get(turmaACCList.size() - 1);
        assertThat(testTurmaACC.getNome()).isEqualTo(UPDATED_NOME);
        assertThat(testTurmaACC.getPontuacao()).isEqualTo(UPDATED_PONTUACAO);
        assertThat(testTurmaACC.getInicio()).isEqualTo(UPDATED_INICIO);
        assertThat(testTurmaACC.getPrazoEnvio()).isEqualTo(UPDATED_PRAZO_ENVIO);
    }

    @Test
    @Transactional
    public void updateNonExistingTurmaACC() throws Exception {
        int databaseSizeBeforeUpdate = turmaACCRepository.findAll().size();

        // Create the TurmaACC

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTurmaACCMockMvc.perform(put("/api/turma-accs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(turmaACC)))
            .andExpect(status().isBadRequest());

        // Validate the TurmaACC in the database
        List<TurmaACC> turmaACCList = turmaACCRepository.findAll();
        assertThat(turmaACCList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteTurmaACC() throws Exception {
        // Initialize the database
        turmaACCRepository.saveAndFlush(turmaACC);

        int databaseSizeBeforeDelete = turmaACCRepository.findAll().size();

        // Delete the turmaACC
        restTurmaACCMockMvc.perform(delete("/api/turma-accs/{id}", turmaACC.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<TurmaACC> turmaACCList = turmaACCRepository.findAll();
        assertThat(turmaACCList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TurmaACC.class);
        TurmaACC turmaACC1 = new TurmaACC();
        turmaACC1.setId(1L);
        TurmaACC turmaACC2 = new TurmaACC();
        turmaACC2.setId(turmaACC1.getId());
        assertThat(turmaACC1).isEqualTo(turmaACC2);
        turmaACC2.setId(2L);
        assertThat(turmaACC1).isNotEqualTo(turmaACC2);
        turmaACC1.setId(null);
        assertThat(turmaACC1).isNotEqualTo(turmaACC2);
    }
}
