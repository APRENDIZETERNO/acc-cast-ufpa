package br.ufpa.lades.accs.web.rest;

import br.ufpa.lades.accs.TurmasAccApp;
import br.ufpa.lades.accs.domain.Certificado;
import br.ufpa.lades.accs.repository.CertificadoRepository;
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
import java.time.Instant;
import java.time.ZonedDateTime;
import java.time.ZoneOffset;
import java.time.ZoneId;
import java.util.List;

import static br.ufpa.lades.accs.web.rest.TestUtil.sameInstant;
import static br.ufpa.lades.accs.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import br.ufpa.lades.accs.domain.enumeration.TipoCertificado;
import br.ufpa.lades.accs.domain.enumeration.StatusCertificado;
/**
 * Integration tests for the {@link CertificadoResource} REST controller.
 */
@SpringBootTest(classes = TurmasAccApp.class)
public class CertificadoResourceIT {

    private static final String DEFAULT_TITULO = "AAAAAAAAAA";
    private static final String UPDATED_TITULO = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRICAO = "AAAAAAAAAA";
    private static final String UPDATED_DESCRICAO = "BBBBBBBBBB";

    private static final ZonedDateTime DEFAULT_DATA_ENVIO = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_DATA_ENVIO = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);
    private static final ZonedDateTime SMALLER_DATA_ENVIO = ZonedDateTime.ofInstant(Instant.ofEpochMilli(-1L), ZoneOffset.UTC);

    private static final String DEFAULT_MOTIVO_PENDENTE = "AAAAAAAAAA";
    private static final String UPDATED_MOTIVO_PENDENTE = "BBBBBBBBBB";

    private static final String DEFAULT_MOTIVO_REJEITADO = "AAAAAAAAAA";
    private static final String UPDATED_MOTIVO_REJEITADO = "BBBBBBBBBB";

    private static final String DEFAULT_MOTIVO_PARCIAL = "AAAAAAAAAA";
    private static final String UPDATED_MOTIVO_PARCIAL = "BBBBBBBBBB";

    private static final TipoCertificado DEFAULT_TIPO = TipoCertificado.LOCAL;
    private static final TipoCertificado UPDATED_TIPO = TipoCertificado.REGIONAL;

    private static final Integer DEFAULT_CH_PEDIDA = 1;
    private static final Integer UPDATED_CH_PEDIDA = 2;
    private static final Integer SMALLER_CH_PEDIDA = 1 - 1;

    private static final Integer DEFAULT_CH_CONCEDIDA = 1;
    private static final Integer UPDATED_CH_CONCEDIDA = 2;
    private static final Integer SMALLER_CH_CONCEDIDA = 1 - 1;

    private static final StatusCertificado DEFAULT_ESTADO = StatusCertificado.REJEITADO;
    private static final StatusCertificado UPDATED_ESTADO = StatusCertificado.PENDENTE;

    private static final String DEFAULT_CAMINHO_ARQUIVO = "AAAAAAAAAA";
    private static final String UPDATED_CAMINHO_ARQUIVO = "BBBBBBBBBB";

    @Autowired
    private CertificadoRepository certificadoRepository;

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

    private MockMvc restCertificadoMockMvc;

    private Certificado certificado;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CertificadoResource certificadoResource = new CertificadoResource(certificadoRepository);
        this.restCertificadoMockMvc = MockMvcBuilders.standaloneSetup(certificadoResource)
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
    public static Certificado createEntity(EntityManager em) {
        Certificado certificado = new Certificado()
            .titulo(DEFAULT_TITULO)
            .descricao(DEFAULT_DESCRICAO)
            .dataEnvio(DEFAULT_DATA_ENVIO)
            .motivoPendente(DEFAULT_MOTIVO_PENDENTE)
            .motivoRejeitado(DEFAULT_MOTIVO_REJEITADO)
            .motivoParcial(DEFAULT_MOTIVO_PARCIAL)
            .tipo(DEFAULT_TIPO)
            .chPedida(DEFAULT_CH_PEDIDA)
            .chConcedida(DEFAULT_CH_CONCEDIDA)
            .estado(DEFAULT_ESTADO)
            .caminhoArquivo(DEFAULT_CAMINHO_ARQUIVO);
        return certificado;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Certificado createUpdatedEntity(EntityManager em) {
        Certificado certificado = new Certificado()
            .titulo(UPDATED_TITULO)
            .descricao(UPDATED_DESCRICAO)
            .dataEnvio(UPDATED_DATA_ENVIO)
            .motivoPendente(UPDATED_MOTIVO_PENDENTE)
            .motivoRejeitado(UPDATED_MOTIVO_REJEITADO)
            .motivoParcial(UPDATED_MOTIVO_PARCIAL)
            .tipo(UPDATED_TIPO)
            .chPedida(UPDATED_CH_PEDIDA)
            .chConcedida(UPDATED_CH_CONCEDIDA)
            .estado(UPDATED_ESTADO)
            .caminhoArquivo(UPDATED_CAMINHO_ARQUIVO);
        return certificado;
    }

    @BeforeEach
    public void initTest() {
        certificado = createEntity(em);
    }

    @Test
    @Transactional
    public void createCertificado() throws Exception {
        int databaseSizeBeforeCreate = certificadoRepository.findAll().size();

        // Create the Certificado
        restCertificadoMockMvc.perform(post("/api/certificados")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(certificado)))
            .andExpect(status().isCreated());

        // Validate the Certificado in the database
        List<Certificado> certificadoList = certificadoRepository.findAll();
        assertThat(certificadoList).hasSize(databaseSizeBeforeCreate + 1);
        Certificado testCertificado = certificadoList.get(certificadoList.size() - 1);
        assertThat(testCertificado.getTitulo()).isEqualTo(DEFAULT_TITULO);
        assertThat(testCertificado.getDescricao()).isEqualTo(DEFAULT_DESCRICAO);
        assertThat(testCertificado.getDataEnvio()).isEqualTo(DEFAULT_DATA_ENVIO);
        assertThat(testCertificado.getMotivoPendente()).isEqualTo(DEFAULT_MOTIVO_PENDENTE);
        assertThat(testCertificado.getMotivoRejeitado()).isEqualTo(DEFAULT_MOTIVO_REJEITADO);
        assertThat(testCertificado.getMotivoParcial()).isEqualTo(DEFAULT_MOTIVO_PARCIAL);
        assertThat(testCertificado.getTipo()).isEqualTo(DEFAULT_TIPO);
        assertThat(testCertificado.getChPedida()).isEqualTo(DEFAULT_CH_PEDIDA);
        assertThat(testCertificado.getChConcedida()).isEqualTo(DEFAULT_CH_CONCEDIDA);
        assertThat(testCertificado.getEstado()).isEqualTo(DEFAULT_ESTADO);
        assertThat(testCertificado.getCaminhoArquivo()).isEqualTo(DEFAULT_CAMINHO_ARQUIVO);
    }

    @Test
    @Transactional
    public void createCertificadoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = certificadoRepository.findAll().size();

        // Create the Certificado with an existing ID
        certificado.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCertificadoMockMvc.perform(post("/api/certificados")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(certificado)))
            .andExpect(status().isBadRequest());

        // Validate the Certificado in the database
        List<Certificado> certificadoList = certificadoRepository.findAll();
        assertThat(certificadoList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllCertificados() throws Exception {
        // Initialize the database
        certificadoRepository.saveAndFlush(certificado);

        // Get all the certificadoList
        restCertificadoMockMvc.perform(get("/api/certificados?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(certificado.getId().intValue())))
            .andExpect(jsonPath("$.[*].titulo").value(hasItem(DEFAULT_TITULO.toString())))
            .andExpect(jsonPath("$.[*].descricao").value(hasItem(DEFAULT_DESCRICAO.toString())))
            .andExpect(jsonPath("$.[*].dataEnvio").value(hasItem(sameInstant(DEFAULT_DATA_ENVIO))))
            .andExpect(jsonPath("$.[*].motivoPendente").value(hasItem(DEFAULT_MOTIVO_PENDENTE.toString())))
            .andExpect(jsonPath("$.[*].motivoRejeitado").value(hasItem(DEFAULT_MOTIVO_REJEITADO.toString())))
            .andExpect(jsonPath("$.[*].motivoParcial").value(hasItem(DEFAULT_MOTIVO_PARCIAL.toString())))
            .andExpect(jsonPath("$.[*].tipo").value(hasItem(DEFAULT_TIPO.toString())))
            .andExpect(jsonPath("$.[*].chPedida").value(hasItem(DEFAULT_CH_PEDIDA)))
            .andExpect(jsonPath("$.[*].chConcedida").value(hasItem(DEFAULT_CH_CONCEDIDA)))
            .andExpect(jsonPath("$.[*].estado").value(hasItem(DEFAULT_ESTADO.toString())))
            .andExpect(jsonPath("$.[*].caminhoArquivo").value(hasItem(DEFAULT_CAMINHO_ARQUIVO.toString())));
    }
    
    @Test
    @Transactional
    public void getCertificado() throws Exception {
        // Initialize the database
        certificadoRepository.saveAndFlush(certificado);

        // Get the certificado
        restCertificadoMockMvc.perform(get("/api/certificados/{id}", certificado.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(certificado.getId().intValue()))
            .andExpect(jsonPath("$.titulo").value(DEFAULT_TITULO.toString()))
            .andExpect(jsonPath("$.descricao").value(DEFAULT_DESCRICAO.toString()))
            .andExpect(jsonPath("$.dataEnvio").value(sameInstant(DEFAULT_DATA_ENVIO)))
            .andExpect(jsonPath("$.motivoPendente").value(DEFAULT_MOTIVO_PENDENTE.toString()))
            .andExpect(jsonPath("$.motivoRejeitado").value(DEFAULT_MOTIVO_REJEITADO.toString()))
            .andExpect(jsonPath("$.motivoParcial").value(DEFAULT_MOTIVO_PARCIAL.toString()))
            .andExpect(jsonPath("$.tipo").value(DEFAULT_TIPO.toString()))
            .andExpect(jsonPath("$.chPedida").value(DEFAULT_CH_PEDIDA))
            .andExpect(jsonPath("$.chConcedida").value(DEFAULT_CH_CONCEDIDA))
            .andExpect(jsonPath("$.estado").value(DEFAULT_ESTADO.toString()))
            .andExpect(jsonPath("$.caminhoArquivo").value(DEFAULT_CAMINHO_ARQUIVO.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingCertificado() throws Exception {
        // Get the certificado
        restCertificadoMockMvc.perform(get("/api/certificados/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCertificado() throws Exception {
        // Initialize the database
        certificadoRepository.saveAndFlush(certificado);

        int databaseSizeBeforeUpdate = certificadoRepository.findAll().size();

        // Update the certificado
        Certificado updatedCertificado = certificadoRepository.findById(certificado.getId()).get();
        // Disconnect from session so that the updates on updatedCertificado are not directly saved in db
        em.detach(updatedCertificado);
        updatedCertificado
            .titulo(UPDATED_TITULO)
            .descricao(UPDATED_DESCRICAO)
            .dataEnvio(UPDATED_DATA_ENVIO)
            .motivoPendente(UPDATED_MOTIVO_PENDENTE)
            .motivoRejeitado(UPDATED_MOTIVO_REJEITADO)
            .motivoParcial(UPDATED_MOTIVO_PARCIAL)
            .tipo(UPDATED_TIPO)
            .chPedida(UPDATED_CH_PEDIDA)
            .chConcedida(UPDATED_CH_CONCEDIDA)
            .estado(UPDATED_ESTADO)
            .caminhoArquivo(UPDATED_CAMINHO_ARQUIVO);

        restCertificadoMockMvc.perform(put("/api/certificados")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedCertificado)))
            .andExpect(status().isOk());

        // Validate the Certificado in the database
        List<Certificado> certificadoList = certificadoRepository.findAll();
        assertThat(certificadoList).hasSize(databaseSizeBeforeUpdate);
        Certificado testCertificado = certificadoList.get(certificadoList.size() - 1);
        assertThat(testCertificado.getTitulo()).isEqualTo(UPDATED_TITULO);
        assertThat(testCertificado.getDescricao()).isEqualTo(UPDATED_DESCRICAO);
        assertThat(testCertificado.getDataEnvio()).isEqualTo(UPDATED_DATA_ENVIO);
        assertThat(testCertificado.getMotivoPendente()).isEqualTo(UPDATED_MOTIVO_PENDENTE);
        assertThat(testCertificado.getMotivoRejeitado()).isEqualTo(UPDATED_MOTIVO_REJEITADO);
        assertThat(testCertificado.getMotivoParcial()).isEqualTo(UPDATED_MOTIVO_PARCIAL);
        assertThat(testCertificado.getTipo()).isEqualTo(UPDATED_TIPO);
        assertThat(testCertificado.getChPedida()).isEqualTo(UPDATED_CH_PEDIDA);
        assertThat(testCertificado.getChConcedida()).isEqualTo(UPDATED_CH_CONCEDIDA);
        assertThat(testCertificado.getEstado()).isEqualTo(UPDATED_ESTADO);
        assertThat(testCertificado.getCaminhoArquivo()).isEqualTo(UPDATED_CAMINHO_ARQUIVO);
    }

    @Test
    @Transactional
    public void updateNonExistingCertificado() throws Exception {
        int databaseSizeBeforeUpdate = certificadoRepository.findAll().size();

        // Create the Certificado

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCertificadoMockMvc.perform(put("/api/certificados")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(certificado)))
            .andExpect(status().isBadRequest());

        // Validate the Certificado in the database
        List<Certificado> certificadoList = certificadoRepository.findAll();
        assertThat(certificadoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteCertificado() throws Exception {
        // Initialize the database
        certificadoRepository.saveAndFlush(certificado);

        int databaseSizeBeforeDelete = certificadoRepository.findAll().size();

        // Delete the certificado
        restCertificadoMockMvc.perform(delete("/api/certificados/{id}", certificado.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Certificado> certificadoList = certificadoRepository.findAll();
        assertThat(certificadoList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Certificado.class);
        Certificado certificado1 = new Certificado();
        certificado1.setId(1L);
        Certificado certificado2 = new Certificado();
        certificado2.setId(certificado1.getId());
        assertThat(certificado1).isEqualTo(certificado2);
        certificado2.setId(2L);
        assertThat(certificado1).isNotEqualTo(certificado2);
        certificado1.setId(null);
        assertThat(certificado1).isNotEqualTo(certificado2);
    }
}
